import "bootstrap/dist/css/bootstrap.css"
import "../styles/globals.css"

import Head from "next/head"
import Layout from "../components/Layout"

import { useEffect } from "react"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js")
  }, [])

  return (
    <>
      <Head>
        <title>OEE | CLS REYNOSA</title>
        <meta charet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="OEE PRODUCTION - CLS REYNOSA" />
        <meta http-equiv="refresh" content="3600" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp