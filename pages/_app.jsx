import "bootstrap/dist/css/bootstrap.css"
import "../styles/globals.css"

import { useEffect } from "react"
import Head from "next/head"
import Layout from "../components/Layout"

import { ContextProvider } from "../components/Context/Context"
import GraphMachineModal from "../components/Modal/GraphMachineModal"

const App = ({ Component, pageProps })  => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js")
  }, [])

  return (
    <>
      <Head>
        <title>OEE | CLS REYNOSA</title>
        <meta charet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="OEE PRODUCTION - CLS REYNOSA" />
        <meta httpEquiv="refresh" content="3600" />
      </Head>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <GraphMachineModal />
      </ContextProvider>
    </>
  )
}

export default App