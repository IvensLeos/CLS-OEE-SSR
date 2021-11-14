import { DatabaseConnection } from "$lib/db/mongodb"
import { GenerateAggregation } from "../hooks"

export async function get() {
  try {
    const Connection = await DatabaseConnection()
    const OEECollection = Connection.Database.collection("oees")
    
    const OEESBYBU = await OEECollection.aggregate(GenerateAggregation("$ROOT_AREA")).toArray()
    const OEESBYPROCESS = await OEECollection.aggregate(GenerateAggregation("$PROCESS")).toArray()
    const OEESBYMACHINE = await OEECollection.aggregate(GenerateAggregation("$MACHINE_NAME")).toArray()
    
    const OEESBYPLANT = await OEECollection.aggregate(GenerateAggregation("ALL PLANT")).toArray()
    
    const ParsedOEE = (Result) => Result.map(OEE => { return { ...OEE, ID: OEE._id } })
    
    const STRAPI_URL = import.meta.env.VITE_STRAPI_URL
    
    const HISTORIC_OEES = await OEECollection.find({}).toArray()
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
        oees(limit: 0) {
          OEEDATE
          DATETIME
          ROOT_AREA
          PROCESS
          MACHINE_NAME
          ITEM
          RATE
          PRODUCED
          SCRAP
          TIME_LOST
          TIME_LOST_COMMENT
          COMMENTS
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
        TODAY_OEE_BY_BUSINESS: [...ParsedOEE(OEESBYBU)],
        TODAY_OEE_BY_PROCESS: [...ParsedOEE(OEESBYPROCESS)],
        TODAY_OEE_BY_MACHINE: [...ParsedOEE(OEESBYMACHINE)],
        TODAY_OEE_ALL_PLANT: [...ParsedOEE(OEESBYPLANT)],
        HISTORIC_OEES: GraphQLQuery.data.oees,
        RATES: GraphQLQuery.data.rates,
        FAILURECODES: GraphQLQuery.data.failurecodes,
        SCRAPCODES: GraphQLQuery.data.scrapcodes
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