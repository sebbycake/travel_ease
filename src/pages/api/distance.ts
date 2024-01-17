import type { NextApiRequest, NextApiResponse } from 'next'
import {
  Client,
  DistanceMatrixRequest,
  DistanceMatrixRow,
  UnitSystem,
  TravelMode,
  TransitMode
}
  from "@googlemaps/google-maps-services-js"

// [origin, averageDistance, averageDuration]
type DistanceRankingResult = Array<[string, number, number]>;

type Data = {
  data?: DistanceRankingResult;
  name?: string;
  error?: string;
}

const AMPERSAND_SIGN = '&'
const EQUAL_SIGN = '='
const PIPE_SIGN = '|'

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

const client = new Client({});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const query = "s1=Parkway+Parade&s2=Tampines+Mall&s3=&s4=&s5=&s6=&s7=&s8=&s9=&s10=&d1=Little+India+MRT+Station&d2=PLQ+Mall&d3=&d4=&d5=&d6=&d7=&d8=&d9=&d10="
  const [src, dest] = getOriginsAndDestinations(query)

  const params_: DistanceMatrixRequest = {
    params: {
      origins: [src],
      destinations: [dest],
      units: UnitSystem.metric,
      mode: TravelMode.transit,
      transit_mode: [TransitMode.train, TransitMode.bus],
      key: process.env.GOOGLE_MAPS_API_KEY || "",
    }
  }

  const results: DistanceRankingResult = []

  try {
    const response = await client.distancematrix(params_)
    const data = response.data
    const originAddresses = data.origin_addresses
    const origins = data.rows
    for (let i = 0; i < origins.length; i++) {
      const [avgDistance, avgDuration] = findAverageDistanceAndDuration(origins[i])
      results.push([originAddresses[i], avgDistance, avgDuration])
    }
    results.sort((placeA, placeB) => placeA[1] - placeB[1])
    res.status(200).json({
      data: results
    })
  } catch (e: any) {
    res.status(400).json({ error: e.response.data.error_message })
  }

}
