import { DatabaseConnection } from '$lib/db/mongodb'
import { GenerateAggregation } from '../hooks'

export async function get(request) {
  try {
    const Connection = await DatabaseConnection()
    const OEECollection = Connection.Database.collection('oees')
    
    const OEESBYBU = await OEECollection.aggregate(GenerateAggregation("$ROOT_AREA")).toArray()
    const OEESBYPROCESS = await OEECollection.aggregate(GenerateAggregation("$PROCESS")).toArray()
    const OEESBYPLANT = await OEECollection.aggregate(GenerateAggregation("ALL PLANT")).toArray()

    const ParsedResult = (Result) => Result.map(OEE => { return { ...OEE, ID: OEE._id } })

    return {
      status: 200,
      body: {
        BusinessOEE: [ ...ParsedResult(OEESBYBU) ],
        ProcessOEE: [ ...ParsedResult(OEESBYPROCESS) ],
        PlantOEE: [ ...ParsedResult(OEESBYPLANT) ],
      }
    }
  } catch (err) {
    return {
      status: 500,
      body: {
        error: 'Server error'
      }
    }
  }
}