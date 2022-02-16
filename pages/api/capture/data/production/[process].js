import { DatabaseConnection } from "../../../../../util/mongodb"
import { NewOEE } from "../../../../../util/hooks"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { process } = req.query

    const ResolveParam = {
      molding: ["MOLDING", "NORTH SIDE", "MOLDING"],
      printing: ["PRINTING", "NORTH SIDE", "PRINTING"],
      printingandassembling: ["PRINTING & ASSEMBLING", "NORTH SIDE", "PRINTING & ASSEMBLING"],
      washing: ["WASHING", "NORTH SIDE", "WASHING"],
      assembling: ["ASSEMBLING", "NORTH SIDE", "ASSEMBLING"],
      assemblingandpacking: ["ASSEMBLING & PACKING", "NORTH SIDE", "ASSEMBLING & PACKING"],
      packing: ["PACKING", "NORTH SIDE", "PACKING"],
      manualpacking: ["MANUAL PACKING", "NORTH SIDE", "MANUAL PACKING"],
      southmoldingQ1: ["MOLDING Q1", "SOUTH SIDE", "MOLDING"],
      southmoldingQ2: ["MOLDING Q2", "SOUTH SIDE", "MOLDING"],
      southmoldingQ3: ["MOLDING Q3", "SOUTH SIDE", "MOLDING"],
      southmoldingQ4: ["MOLDING Q4", "SOUTH SIDE", "MOLDING"],
      southpadprinting: ["PAD PRINTING", "SOUTH SIDE", "PRINTING"],
      southassemblingrb: ["ASSEMBLING RB", "SOUTH SIDE", "ASSEMBLING"],
      southassemblingandpackingrb: ["ASSEMBLING & PACKING RB", "SOUTH SIDE", "ASSEMBLING & PACKING"],
      southmanualpackingrb: ["MANUAL PACKING RB", "SOUTH SIDE", "MANUAL PACKING"],
      southmoldingrb: ["MOLDING RB", "SOUTH SIDE", "MOLDING"],
      southpackingrb: ["PACKING RB", "SOUTH SIDE", "PACKING"],
      southprintingrb: ["PRINTING RB", "SOUTH SIDE", "PRINTING"],
    }

    const Connection = await DatabaseConnection()
    const OEESCollection = Connection.Database.collection("oees")
    const OEES = await OEESCollection.find({ "OEEDATE": NewOEE(), "PROCESS": ResolveParam[process][0] }).project({ "_id": 0 }).toArray()

    res.status(200).json({
      OEES
    })
  }
  else if (req.method === "POST") {
    // const { process } = req.query
    const OEEDATA = req.body

    const Connection = await DatabaseConnection()
    const OEESCollection = Connection.Database.collection("oees")

    const { IDENTIFIER } = OEEDATA

    const FindAndUpdateOEE = await OEESCollection.findOneAndUpdate({ IDENTIFIER }, { "$set": { ...OEEDATA, DATETIME: new Date(OEEDATA.DATETIME), OEEDATE: NewOEE() } })

    if (!FindAndUpdateOEE.value) {
      await OEESCollection.insertOne({ ...OEEDATA, DATETIME: new Date(OEEDATA.DATETIME), OEEDATE: NewOEE() })
    }
    
    res.status(200).json({
      Update: "OK"
    })
  }
}