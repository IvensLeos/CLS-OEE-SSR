import { DatabaseConnection } from "../../../../../util/mongodb"
import { GenerateAggregation } from "../../../../../util/hooks"

export default async function handler(req, res) {
  const { area } = req.query
  
  const ResolveParam = {
    cryo: ["CRYO", "AREA"],
    tips: ["TIP'S", "AREA"],
    mcts: ["MCT'S", "AREA"],
    scts: ["SCT'S", "AREA"],
    cell: ["CELL", "AREA"],
    beaker: ["BEAKER", "AREA"],
    reservoir: ["RESERVOIR", "AREA"],
    ctscorning: ["CT'S CORNING", "AREA"],
    ctsfalcon: ["CT'S FALCON", "AREA"],
    roundbottom: ["ROUND BOTTOM", "AREA"],
    genomics: ["GENOMICS", "AREA"],
    buyouts: ["BUYOUTS", "AREA"],
    molding: ["MOLDING", "PROCESS"],
    printing: ["PRINTING", "PROCESS"],
    printingandassembling: ["PRINTING & ASSEMBLING", "PROCESS"],
    washing: ["WASHING", "PROCESS"],
    assembling: ["ASSEMBLING", "PROCESS"],
    assemblingandpacking: ["ASSEMBLING & PACKING", "PROCESS"],
    packing: ["PACKING", "PROCESS"],
    manualpacking: ["MANUAL PACKING", "PROCESS"],
  }

  const Connection = await DatabaseConnection()
  const OEECollection = Connection.Database.collection("oees")
  let OEESBYAREAPROCESSBYMACHINE

  if (ResolveParam[area][1] === "AREA") {
    OEESBYAREAPROCESSBYMACHINE = await OEECollection.aggregate(GenerateAggregation("$MACHINE_NAME", ResolveParam[area][0])).toArray()
  }
  else {
    OEESBYAREAPROCESSBYMACHINE = await OEECollection.aggregate(GenerateAggregation("$MACHINE_NAME")).toArray()
  }

  const ParsedResult = (Result) => Result.map(OEE => { return { ...OEE, ID: OEE._id } })

  res.status(200).json({
    OEES: [...ParsedResult(OEESBYAREAPROCESSBYMACHINE)]
  })
}