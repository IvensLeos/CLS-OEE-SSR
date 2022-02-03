import { DatabaseConnection } from "../../../../../util/mongodb"
import { NewOEE } from "../../../../../util/hooks"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { process } = req.query

    const ResolveParam = {
      molding: ["MOLDING", "NORTH SIDE"],
      printing: ["PRINTING", "NORTH SIDE"],
      printingandassembling: ["PRINTING & ASSEMBLING", "NORTH SIDE"],
      washing: ["WASHING", "NORTH SIDE"],
      assembling: ["ASSEMBLING", "NORTH SIDE"],
      assemblingandpacking: ["ASSEMBLING & PACKING", "NORTH SIDE"],
      packing: ["PACKING", "NORTH SIDE"],
      manualpacking: ["MANUAL PACKING", "NORTH SIDE"],
      southmoldingQ1: ["MOLDING Q1", "SOUTH SIDE"],
      southmoldingQ2: ["MOLDING Q2", "SOUTH SIDE"],
      southmoldingQ3: ["MOLDING Q3", "SOUTH SIDE"],
      southmoldingQ4: ["MOLDING Q4", "SOUTH SIDE"],
      southpadprinting: ["PAD PRINTING", "SOUTH SIDE"],
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