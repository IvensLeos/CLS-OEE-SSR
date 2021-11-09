import { DatabaseConnection } from "$lib/db/mongodb"
import { GenerateAggregation } from "../hooks"

export async function get() {
  try {
    const Connection = await DatabaseConnection()
    const OEECollection = Connection.Database.collection("oees")

    const HISTORIC_OEES = await OEECollection.find({}).toArray()
    const OEESBYBU = await OEECollection.aggregate(GenerateAggregation("$ROOT_AREA")).toArray()
    const OEESBYPROCESS = await OEECollection.aggregate(GenerateAggregation("$PROCESS")).toArray()
    const OEESBYPLANT = await OEECollection.aggregate(GenerateAggregation("ALL PLANT")).toArray()
    const OEESBYAREAPROCESSBYMACHINE = await OEECollection.aggregate(GenerateAggregation("$MACHINE_NAME")).toArray()
    
    const RatesCollection = Connection.Database.collection("rates")
    const FailureCodesCollection = Connection.Database.collection("failurecodes")
    const ScrapCodesCollection = Connection.Database.collection("scrapcodes")


    const RATES = await RatesCollection.find({}).toArray()
    const FAILURECODES = await FailureCodesCollection.find({}).map(Key => Key.FAILURECODE).toArray()
    const SCRAPCODES = await ScrapCodesCollection.find({}).map(Key => Key.SCRAPCODE).toArray()

    const ParsedOEE = (Result) => Result.map(OEE => { return { ...OEE, ID: OEE._id } })

    return {
      status: 200,
      body: {
        TODAY_OEE_BY_BUSINESS: [...ParsedOEE(OEESBYBU)],
        TODAY_OEE_BY_PROCESS: [...ParsedOEE(OEESBYPROCESS)],
        TODAY_OEE_BY_MACHINE: [...ParsedOEE(OEESBYAREAPROCESSBYMACHINE)],
        TODAY_OEE_ALL_PLANT: [...ParsedOEE(OEESBYPLANT)],
        HISTORIC_OEES,
        RATES,
        FAILURECODES,
        SCRAPCODES
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