import { DatabaseConnection } from "../../util/mongodb"

export default async function handler(req, res) {
  const { Process } = req.body

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
  const RatesCollection = Connection.Database.collection("rates")

  let RATES

  if (req.method === "GET") {
    RATES = await RatesCollection.find({}).project({ "_id": 0, "ITEM": 1, "MACHINE": 1, "RATE": 1, "WORK_CENTER": 1, "ROOT_AREA": 1 }).toArray()
  }
  else if (req.method === "POST") {
    RATES = await RatesCollection.find({ "WORK_CENTER": ResolveParam[Process][0] }).project({ "_id": 0, "ITEM": 1, "MACHINE": 1, "RATE": 1, "WORK_CENTER": 1, "ROOT_AREA": 1 }).toArray()
  }

  res.status(200).json({
    RATES
  })
}