import { DatabaseConnection } from "../../util/mongodb"

export default async function handler(req, res) {
  const { Process } = req.body

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