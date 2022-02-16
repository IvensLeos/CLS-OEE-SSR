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