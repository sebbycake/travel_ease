import { useState, useEffect } from "react"
import Head from 'next/head'
import {
  Stack,
  Grid,
  Spinner,
  Flex
}
  from '@chakra-ui/react'
import OriginCard from '@/components/MapResults/OriginCard/OriginCard'
import CustomMap from '@/components/MapResults/CustomMap/CustomMap'
import { Results } from "./api/distance"

const API_ENDPOINT = '/api/distance'
const ORIGIN_GEOCODE = 1

export default function Results() {

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
  const [data, setData] = useState({} as Results)

  function extractParametersFromUrl() {
    return new URLSearchParams(window.location.search).toString();
  }

  useEffect(() => {

    async function fetchData() {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addresses: extractParametersFromUrl()
        }),
      };
      try {
        const response = await fetch(API_ENDPOINT, options)
        const { data }= await response.json()
        console.log(data)
        setData(data)
      } catch (e) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
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
      {
        isLoading
          ?
          <Flex height={'100vh'} justifyContent={'center'} alignItems={'center'}>
            <Spinner color="#00BFA6" size={'xl'} emptyColor='gray.200' thickness='3px' speed='0.7s' />
          </Flex>
          :
          isError
            ?
            <p style={{ textAlign: "center", color: "red" }}>Error occurred. Please try again later.</p>
            :
            <Grid
              h='100vh'
              templateColumns='1fr 3fr'
              gap={2}
            >
              <Stack gap={2} overflow={'scroll'}>
                {data.ranking.map((place, i) =>
                  <OriginCard key={i} data={place} rank={i} handleClick={setActiveCard} />
                )}
              </Stack>
              <CustomMap currentOrigin={data.ranking[activeCard][ORIGIN_GEOCODE]} destinations={data.destination_geocode} />
            </Grid >
      }

    </>
  )
}
