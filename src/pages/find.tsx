import Head from 'next/head'
import styles from "../styles/Find.module.css"
import Layout from '@/components/Layout/Layout'
import {
  Stack,
  Text,
  Heading,
  Divider,
}
  from '@chakra-ui/react'
import Button from '@/components/ui/Button/Button'
import Form from '@/components/Form/Form'

export default function Find() {

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
            <Form />
            <Divider />
            <Button label="Find" href="" />
          </Stack>
        </div>
      </Layout>
    </>
  )
}
