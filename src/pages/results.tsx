import Head from 'next/head'
import {
  Stack,
  Grid
}
  from '@chakra-ui/react'
import OriginCard from '@/components/MapResults/OriginCard/OriginCard'
import { DistanceRankingResult } from './api/distance'
import CustomMap from '@/components/MapResults/CustomMap/CustomMap'

const data: DistanceRankingResult[] = [
  ["Parkway Parade", 1, 0],
  ["Little India", 1, 0],
  ["Tampines Mall", 1, 0],
  ["Punggol St 44", 1, 0],
  ["PLQ Mall", 1, 0],
]

export default function Results() {
  return (
    <>
      <Head>
        <title>TravelEase | Results </title>
        <meta name="description" content="Optimize your stay for your next trip with TravelEase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        h='100vh'
        templateColumns='1fr 3fr'
        gap={2}
      >
        <Stack gap={2}>
          {data.map((d, i) => <OriginCard key={i} data={d} rank={i} />)}
        </Stack>
        <CustomMap />
      </Grid>
    </>
  )
}
