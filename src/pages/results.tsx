import { useState, useEffect } from "react"
import Head from 'next/head'
import {
  Stack,
  Grid,
  Spinner
}
  from '@chakra-ui/react'
import OriginCard from '@/components/MapResults/OriginCard/OriginCard'
import CustomMap from '@/components/MapResults/CustomMap/CustomMap'

export default function Results() {

  const [isLoading, setIsLoading] = useState(true)
  const [activeCard, setActiveCard] = useState(0)
  const [rankingData, setRankingData] = useState([])
  const [destinations, setDestinations] = useState([])

  useEffect(() => {

    async function fetchData() {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addresses: new URLSearchParams(window.location.search).toString(),
        }),
      };
      const response = await fetch('api/distance', options)
      const data = await response.json()
      console.log(data)
      setRankingData(data.data.ranking)
      setDestinations(data.data.destination_geocode)
      setIsLoading(false)
    }

    fetchData()

  }, [])

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
        {
          isLoading
            ? <Spinner />
            : (
              <>
                <Stack gap={2} overflow={'scroll'}>
                  {rankingData.map((d, i) => <OriginCard key={i} data={d} rank={i} handleClick={setActiveCard} />)}
                </Stack>
                <CustomMap currentOrigin={rankingData[activeCard][1]} destinations={destinations} />
              </>
            )
        }
      </Grid>
    </>
  )
}
