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
    southassemblingrb: ["ASSEMBLING RB", "SOUTH SIDE"],
    southassemblingandpackingrb: ["ASSEMBLING & PACKING RB", "SOUTH SIDE"],
    southmanualpackingrb: ["MANUAL PACKING RB", "SOUTH SIDE"],
    southmoldingrb: ["MOLDING RB", "SOUTH SIDE"],
    southpackingrb: ["PACKING RB", "SOUTH SIDE"],
    southprintingrb: ["PRINTING RB", "SOUTH SIDE"],
  }

  const Connection = await DatabaseConnection()
  const MachinesCollection = Connection.Database.collection("machines")
  
  let MACHINES

  if (req.method === "GET") {
    MACHINES = await MachinesCollection.find({ "ACTIVE": true }).project({ "_id": 0, "MACHINE_NAME": 1, "PROCESS": 1, "SIDE": 1 }).sort({ "MACHINE_NAME": 1 }).toArray()
  }
  else if (req.method === "POST") {
    MACHINES = await MachinesCollection.find({ "ACTIVE": true, "PROCESS": ResolveParam[Process][0], "SIDE": ResolveParam[Process][1] }).project({ "_id": 0, "MACHINE_NAME": 1, "PROCESS": 1 }).sort({ "MACHINE_NAME": 1 }).toArray()
  }

  res.status(200).json({
    MACHINES
  })
}