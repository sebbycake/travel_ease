import Head from 'next/head';

interface IOwnProps {
  title?: string;
}

export default function MetaHeader() {
  return <Head>
    <title>TravelEase</title>
    <meta name="description" content="Optimize your stay for your next trip with TravelEase" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
}