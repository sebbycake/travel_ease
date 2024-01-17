import type { NextApiRequest, NextApiResponse } from 'next'
import {
  Client,
  DistanceMatrixRequest,
  DistanceMatrixRow,
  UnitSystem,
  TravelMode,
  TransitMode,
  GeocodeRequest,
  LatLngLiteral,
}
from "@googlemaps/google-maps-services-js"

// [origin, averageDistance, averageDuration]
export type DistanceRankingResult = [string, LatLngLiteral, number, number];
interface Results {
  ranking: DistanceRankingResult[];
  destination_geocode: LatLngLiteral[];
}

type Data = {
  data?: Results;
  name?: string;
  error?: string;
}

const AMPERSAND_SIGN = '&'
const EQUAL_SIGN = '='
const PIPE_SIGN = '|'
const client = new Client({});

function getValues(splittedQueryString: string) {
  const splitArr = splittedQueryString.split(AMPERSAND_SIGN)
  const arr = []
  for (const splitVal of splitArr) {
    const idx = splitVal.indexOf(EQUAL_SIGN)
    const value = splitVal.slice(idx + 1)
    if (value !== "") {
      arr.push(value)
    }
  }
  return arr.join(PIPE_SIGN)
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
    totalDistance += destination.distance.value
    totalDuration += destination.duration.value
  }
  const avgDistance = totalDistance / destinations.length
  const avgDuration = totalDuration / destinations.length
  return [avgDistance, avgDuration]
}

async function getGeocodeLocation(address: string): Promise<LatLngLiteral> {
  const params_: GeocodeRequest = {
    params: {
      address: address,
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    }
  }
  const response = await client.geocode(params_)
  return response.data.results[0].geometry.location
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const query = "s1=Parkway+Parade&s2=Tampines+Mall&s3=&s4=&s5=&s6=&s7=&s8=&s9=&s10=&d1=Little+India+MRT+Station&d2=PLQ+Mall&d3=&d4=&d5=&d6=&d7=&d8=&d9=&d10="
  console.log(req.body)
  const [src, dest] = getOriginsAndDestinations(query)

  console.log(src)
  console.log(dest)

  const params_: DistanceMatrixRequest = {
    params: {
      origins: [src],
      destinations: [dest],
      units: UnitSystem.metric,
      mode: TravelMode.transit,
      transit_mode: [TransitMode.train, TransitMode.bus],
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    }
  }

  const results: DistanceRankingResult[] = []

  try {
    const response = await client.distancematrix(params_)
    console.log(response)
    const data = response.data
    const originAddresses = data.origin_addresses
    const origins = data.rows
    for (let i = 0; i < origins.length; i++) {
      const [avgDistance, avgDuration] = findAverageDistanceAndDuration(origins[i])
      results.push([originAddresses[i], await getGeocodeLocation(originAddresses[i]), avgDistance, avgDuration])
    }
    results.sort((placeA, placeB) => placeA[2] - placeB[2])

    const destination_addresses_geocode = []
    for (const dest of data.destination_addresses) {
      const destGeoCode = await getGeocodeLocation(dest)
      destination_addresses_geocode.push(destGeoCode)
    }

    res.status(200).json({
      data: { 
        ranking: results,
        destination_geocode: destination_addresses_geocode
      }
    })
  } catch (e: any) {
    res.status(400).json({ error: e.response.data.error_message })
  }

}
