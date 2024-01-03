import Head from 'next/head'
import styles from "../styles/Home.module.css"
import Button from '@/components/ui/Button/Button'
import Layout from '@/components/Layout/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>TravelEase</title>
        <meta name="description" content="Optimize your stay for your next trip with TravelEase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.container}>

          <div className={styles.image_container}>
            <img
              src="/undraw_house_searching_re_stk8.svg"
              alt=""
              className={styles.landing_page_img}
            />  
          </div>

          <div className={styles.description}>
            <p className={styles.tagline}>Finding Stays Close to Your Itinerary</p>
            <p className={styles.explanation}>
              We help you choose accommodations close to the attractions you plan 
              to visit so that you can optimize your stay for your next trip.
            </p>
            <Button label="Get Started" />
          </div>
        </div>

      </Layout>
    </>
  )
}
