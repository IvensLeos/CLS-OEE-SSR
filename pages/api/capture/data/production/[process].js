import { DatabaseConnection } from "../../../../../util/mongodb"
import { NewOEE } from "../../../../../util/hooks"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { process } = req.query

    const ResolveParam = {
      molding: "MOLDING",
      printing: "PRINTING",
      printingandassembling: "PRINTING & ASSEMBLING",
      washing: "WASHING",
      assembling: "ASSEMBLING",
      assemblingandpacking: "ASSEMBLING & PACKING",
      packing: "PACKING",
      manualpacking: "MANUAL PACKING",
    }

    const Connection = await DatabaseConnection()
    const OEESCollection = Connection.Database.collection("oees")
    const OEES = await OEESCollection.find({ "OEEDATE": NewOEE(), "PROCESS": ResolveParam[process] }).project({ "_id": 0 }).toArray()

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