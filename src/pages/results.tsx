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

export default function Result() {

  return (
    <>
      <Head>
        <title>TravelEase | Results </title>
        <meta name="description" content="Optimize your stay for your next trip with TravelEase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        Results page
      </Layout>
    </>
  )
}
