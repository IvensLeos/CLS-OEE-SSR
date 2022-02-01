import { DatabaseConnection } from "../../util/mongodb"

export default async function handler(req, res) {
  const { Process } = req.body

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
  const RatesCollection = Connection.Database.collection("rates")

  let RATES

  if (req.method === "GET") {
    RATES = await RatesCollection.find({}).project({ "_id": 0, "ITEM": 1, "MACHINE": 1, "RATE": 1, "WORK_CENTER": 1, "ROOT_AREA": 1 }).toArray()
  }
  else if (req.method === "POST") {
    RATES = await RatesCollection.find({ "WORK_CENTER": ResolveParam[Process] }).project({ "_id": 0, "ITEM": 1, "MACHINE": 1, "RATE": 1, "WORK_CENTER": 1, "ROOT_AREA": 1 }).toArray()
  }

  res.status(200).json({
    RATES
  })
}