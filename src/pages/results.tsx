import { useState, useEffect } from "react"
import MetaHeader from "@/components/ui/MetaHeader/MetaHeader"
import {
  Stack,
  Grid,
}
  from '@chakra-ui/react'
import OriginCard from '@/components/MapResults/OriginCard/OriginCard'
import CustomMap from '@/components/MapResults/CustomMap/CustomMap'
import { Results } from "./api/distance"
import MapSkeleton from "@/components/MapResults/MapSkeleton/MapSkeleton"
import ErrorBanner from "@/components/MapResults/ErrorBanner/ErrorBanner"

enum Status {
  LOADING = "loading",
  EMPTY_RESULTS = "empty",
  SUCCESSFUL = "successfull",
  ERROR = "error",
}
const API_ENDPOINT = '/api/distance'
const ORIGIN_GEOCODE = 1
const ERR_MSG = "Oops! Something went wrong. Please try again later."
const EMPTY_RESULTS_MSG = "There are no valid results based on your inputs."

export default function Results() {

  const [status, setStatus] = useState<Status>(Status.LOADING)
  const [activeCard, setActiveCard] = useState(0)
  const [data, setData] = useState({
    ranking: [],
    destination_geocode: []
  })

  function extractParametersFromUrl() {
    return new URLSearchParams(window.location.search).toString()
  }

  useEffect(() => {

    async function fetchData() {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addresses: extractParametersFromUrl() || ""
        }),
      };
      try {
        const response = await fetch(API_ENDPOINT, options)
        const { data } = await response.json()
        if (data.ranking.length > 0) {
          setStatus(Status.SUCCESSFUL)
          setData(data)
        } else {
          setStatus(Status.EMPTY_RESULTS)
        }
      } catch (e) {
        setStatus(Status.ERROR)
      }
    } 

    fetchData()

  }, [])

  return (
    <>
      <MetaHeader />

      { status === Status.LOADING && <MapSkeleton /> }

      { status === Status.ERROR && <ErrorBanner message={ERR_MSG} /> }

      { status === Status.EMPTY_RESULTS && <ErrorBanner message={EMPTY_RESULTS_MSG} /> }

      {
        status === Status.SUCCESSFUL && 
        <Grid
          h='100vh'
          templateColumns='1fr 3fr'
        >
          <Stack gap={3} overflow={'scroll'}>
            {data.ranking.map((place, i) =>
              <OriginCard key={i} data={place} rank={i} activeCard={activeCard} handleClick={setActiveCard} />
            )}
          </Stack>
            <CustomMap currentOrigin={data.ranking[activeCard][ORIGIN_GEOCODE]} destinations={data.destination_geocode} />
        </Grid >
      }
    </>
  )
}
