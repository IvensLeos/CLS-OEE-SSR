import { DatabaseConnection } from "../../../../util/mongodb"
import { GenerateAggregation } from "../../../../util/hooks"

export default async function handler(req, res) {
  const { area } = req.query
  
  const ResolveParam = {
    cryo: "CRYO",
    tips: "TIP'S",
    mcts: "MCT'S",
    scts: "SCT'S",
    cell: "CELL",
    beaker: "BEAKER",
    reservoir: "RESERVOIR",
    ctscorning: "CT'S CORNING",
    ctsfalcon: "CT'S FALCON"
  }

  const Connection = await DatabaseConnection()
  const OEECollection = Connection.Database.collection("oees")
  const OEESBYAREAPROCESSBYMACHINE = await OEECollection.aggregate(GenerateAggregation("$MACHINE_NAME", ResolveParam[area])).toArray()

  const ParsedResult = (Result) => Result.map(OEE => { return { ...OEE, ID: OEE._id } })

  res.status(200).json({
    OEES: [...ParsedResult(OEESBYAREAPROCESSBYMACHINE)]
  })
}