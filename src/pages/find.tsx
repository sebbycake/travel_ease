import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from "../styles/Find.module.css"
import Layout from '@/components/Layout/Layout'
import {
  Input,
  SimpleGrid,
  Stack,
  Text,
  Heading,
  Radio,
  RadioGroup,
  Divider,
  Tooltip,
  FormLabel
}
  from '@chakra-ui/react'
import Button from '@/components/ui/Button/Button'

export default function Find() {

  const [searchParams, setSearchParams] = useState({
    s1: "",
    s2: "",
    s3: "",
    s4: "",
    s5: "",
    s6: "",
    s7: "",
    s8: "",
    s9: "",
    s10: "",
    d1: "",
    d2: "",
    d3: "",
    d4: "",
    d5: "",
    d6: "",
    d7: "",
    d8: "",
    d9: "",
    d10: ""
  })

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams).toString()
    history.replaceState(searchParams, "", `/find?${queryParams}`)
  }, [searchParams])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setSearchParams((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const SOURCE_KEYS: Array<keyof typeof searchParams> = ["s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"]
  const DEST_KEYS: Array<keyof typeof searchParams> = ["d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10"]

  return (
    <>
      <Head>
        <title>TravelEase | Find </title>
        <meta name="description" content="Optimize your stay for your next trip with TravelEase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.container}>
          <Stack spacing={4}>
            <Heading size='md'>What is TravelEase?</Heading>
            <Text>
              TravelEase simplifies your trip planning by comparing various accommodations options based on their proximity
              to your desired destinations.
              It evaluates and ranks your options using average travel distance and time to each site,
              tailored to your chosen mode of transport.
              Make informed decisions and enjoy a more convenient journey with TravelEase.
            </Text>
            <Text>
              To start, copy the names or addresses of your accommodations and places of attractions
              you have researched below.
              Then, hit the Find button to generate the results.
            </Text>

            <Divider />

            <SimpleGrid columns={2} spacing={4}>
              <Stack spacing={2}>
                <Tooltip
                  label="After researching the various hotels and Airbnbs, copy their names
                  or addresss below."
                  placement='top-start'
                >
                  <FormLabel as='legend'>
                    Accommodation Options (source)
                  </FormLabel>
                </Tooltip>
                <Input
                  placeholder='Name or address of accomodation 1' value={searchParams.s1}
                  focusBorderColor='black'
                  onChange={(event) => handleChange(event, "s1")}
                />
                {
                  SOURCE_KEYS.map((key) => <Input
                    key={key}
                    placeholder='Optional' value={searchParams[key]}
                    focusBorderColor='black'
                    onChange={(event) => handleChange(event, key)}
                  />)
                }
              </Stack>

              <Stack spacing={2}>
                <Tooltip
                  label="Copy the names or addresses of the places in your itinerary below."
                  placement='top-start'
                >
                  <FormLabel as='legend'>
                    Places of Attractions (destination)
                  </FormLabel>
                </Tooltip>
                <Input
                  placeholder='Name or address of place of attraction 1' value={searchParams.d1}
                  focusBorderColor='black'
                  onChange={(event) => handleChange(event, "d1")}
                />
                {
                  DEST_KEYS.map((key) => <Input
                    key={key}
                    placeholder='Optional' value={searchParams[key]}
                    focusBorderColor='black'
                    onChange={(event) => handleChange(event, key)}
                  />)
                }
              </Stack>
            </SimpleGrid>

            <RadioGroup colorScheme='green'>
              <FormLabel as='legend'>
                Mode of Transport
              </FormLabel>
              <Stack direction='row'>
                <Radio value='public_transport'>Public transport</Radio>
                <Radio value='private_car_taxi'>Private car or taxi</Radio>
                <Radio value='biking'>Biking</Radio>
              </Stack>
            </RadioGroup>

            <Divider />

            <Button label="Find" href="" />
          </Stack>
        </div>

      </Layout>
    </>
  )
}
