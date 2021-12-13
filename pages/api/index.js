import { DatabaseConnection } from "../../util/mongodb"
import { GenerateAggregation } from "../../util/hooks"

export default async function handler(req, res) {
  const Connection = await DatabaseConnection()
  const OEECollection = Connection.Database.collection("oees")

  const OEESBYBU = await OEECollection.aggregate(GenerateAggregation("$ROOT_AREA")).toArray()
  const OEESBYPROCESS = await OEECollection.aggregate(GenerateAggregation("$PROCESS")).toArray()
  const OEESBYPLANT = await OEECollection.aggregate(GenerateAggregation("ALL PLANT")).toArray()

  const ParsedOEE = (Result) => Result.map(OEE => { return { ...OEE, ID: OEE._id } })

  res.status(200).json({
    BusinessOEE: [...ParsedOEE(OEESBYBU)],
    ProcessOEE: [...ParsedOEE(OEESBYPROCESS)],
    PlantOEE: [...ParsedOEE(OEESBYPLANT)]
  })
}