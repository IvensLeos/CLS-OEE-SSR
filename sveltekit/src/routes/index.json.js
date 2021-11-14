import { DatabaseConnection } from "$lib/db/mongodb"
import { GenerateAggregation } from "../hooks"

export async function get(request) {
  try {
    const Connection = await DatabaseConnection()
    const OEECollection = Connection.Database.collection("oees")
    
    const OEESBYBU = await OEECollection.aggregate(GenerateAggregation("$ROOT_AREA")).toArray()
    const OEESBYPROCESS = await OEECollection.aggregate(GenerateAggregation("$PROCESS")).toArray()
    const OEESBYPLANT = await OEECollection.aggregate(GenerateAggregation("ALL PLANT")).toArray()

    const ParsedOEE = (Result) => Result.map(OEE => { return { ...OEE, ID: OEE._id } })

    const STRAPI_URL = import.meta.env.VITE_STRAPI_URL

    let Query = JSON.stringify({
      "query": `{
        failurecodes(limit: 0) {
          FAILURECODE
        }
        scrapcodes(limit: 0) {
          SCRAPCODE
        }
        rates(limit: 0) {
          ITEM
          MACHINE
          RATE
          ROOT_AREA
          WORK_CENTER
        }
      }
    `})

    const GraphQLQuery = await fetch(STRAPI_URL + "graphql", {
      "method": "POST",
      "headers": { "content-type": "application/json" },
      "body": Query
    }).then(res => res.json())

    return {
      status: 200,
      body: {
        BusinessOEE: [ ...ParsedOEE(OEESBYBU) ],
        ProcessOEE: [ ...ParsedOEE(OEESBYPROCESS) ],
        PlantOEE: [ ...ParsedOEE(OEESBYPLANT) ],
        RATES: GraphQLQuery.data.rates,
        FAILURECODES: GraphQLQuery.data.failurecodes.map(key => key.FAILURECODE),
        SCRAPCODES: GraphQLQuery.data.scrapcodes.map(key => key.SCRAPCODE),
      }
    }
  } catch (err) {
    return {
      status: 500,
      body: {
        error: "Server error"
      }
    }
  }
}