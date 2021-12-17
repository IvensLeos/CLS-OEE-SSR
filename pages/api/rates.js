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
    RATES = await RatesCollection.find().toArray()
  }
  else if (req.method === "POST") {
    RATES = await RatesCollection.find({ "WORK_CENTER": ResolveParam[Process] }).toArray()
  }

  res.status(200).json({
    RATES
  })
}