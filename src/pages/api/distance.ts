import type { NextApiRequest, NextApiResponse } from 'next'
import {
  DistanceMatrixRow,
  LatLngLiteral,
}
  from "@googlemaps/google-maps-services-js"
import { MapService } from '@/services/MapService';

export type DistanceRankingResult = {
  name: string;
  address: string;
  position: LatLngLiteral;
  avg_distance: number;
  avg_duration: number;
}

export type DestinationResult = {
  name: string;
  address: string;
  position: LatLngLiteral;
}

export interface Results {
  ranking: DistanceRankingResult[];
  destination_geocode: DestinationResult[];
}

type Data = {
  data?: Results;
  name?: string;
  error?: string;
}

const AMPERSAND_SIGN = '&'
const EQUAL_SIGN = '='
const PIPE_SIGN = '|'
const ONE_KM = 1000;
const ONE_HOUR = 60;
const mapService = new MapService()

function getValues(splittedQueryString: string) {
  const splitArr = splittedQueryString.split(AMPERSAND_SIGN)
  const arr = []
  for (const splitVal of splitArr) {
    const idx = splitVal.indexOf(EQUAL_SIGN)
    const value = splitVal.slice(idx + 1)
    if (value !== "") {
      arr.push(decodeURIComponent(value.replace(/\+/g, ' ')))
    }
  }
  return arr
}

function getOriginsAndDestinations(queryString: string) {
  const [src, dest] = queryString.split("&d1=")
  return [getValues(src), getValues(dest)]
}

function findAverageDistanceAndDuration(distanceMatrixRow: DistanceMatrixRow) {
  let totalDistance = 0
  let totalDuration = 0
  const destinations = distanceMatrixRow.elements
  for (const destination of destinations) {
    console.log(destination)
    totalDistance += destination.distance.value
    totalDuration += destination.duration.value
  }
  const avgDistance = (totalDistance / ONE_KM) / destinations.length
  const avgDuration = (totalDuration / ONE_HOUR) / destinations.length
  return [parseFloat(avgDistance.toFixed(2)), parseFloat(avgDuration.toFixed(0))]
}

const DISTANCE_WEIGHT = 0.7; 
const DURATION_WEIGHT = 0.3;
function placeComparatorFunction(placeA: DistanceRankingResult, placeB: DistanceRankingResult) {
  const combinedValueA = placeA.avg_distance * DISTANCE_WEIGHT + placeA.avg_duration * DURATION_WEIGHT;
  const combinedValueB = placeB.avg_distance * DISTANCE_WEIGHT + placeB.avg_duration * DURATION_WEIGHT;
  return combinedValueA - combinedValueB;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // const query = "s1=Parkway+Parade&s2=Tampines+Mall&s3=&s4=&s5=&s6=&s7=&s8=&s9=&s10=&d1=Little+India+MRT+Station&d2=PLQ+Mall&d3=&d4=&d5=&d6=&d7=&d8=&d9=&d10="
  const [src, dest] = getOriginsAndDestinations(req.body.addresses)

  console.log(src)
  console.log(dest)

  const results: DistanceRankingResult[] = []

  try {
    const response = await mapService.getDistanceMatrix(src.join(PIPE_SIGN), dest.join(PIPE_SIGN))
    const data = response.data
    console.log(data)
    const originAddresses = data.origin_addresses
    const origins = data.rows
    for (let i = 0; i < origins.length; i++) {
      const [avgDistance, avgDuration] = findAverageDistanceAndDuration(origins[i])
      results.push({
        name: src[i],
        address: originAddresses[i],
        position: await mapService.getGeocodeLocation(src[i]),
        avg_distance: avgDistance,
        avg_duration: avgDuration
      })
    }
    results.sort(placeComparatorFunction)

    const destinationResults: DestinationResult[] = []

    for (let i = 0; i < dest.length; i++) {
      const destGeoCode = await mapService.getGeocodeLocation(dest[i])
      destinationResults.push({
        name: dest[i],
        address: data.destination_addresses[i],
        position: destGeoCode
      })
    }

    res.status(200).json({
      data: {
        ranking: results,
        destination_geocode: destinationResults
      }
    })
    
  } catch (e: any) {
    res.status(200).json({
      data: {
        ranking: [],
        destination_geocode: []
      }
    })
  }

}
