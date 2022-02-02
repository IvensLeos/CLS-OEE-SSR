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
    southmolding: ["MOLDING", "SOUTH SIDE"],
    assemblingtips: ["ASSEMBLING TIP'S", "SOUTH SIDE"],
    pounchedtubes: ["POUNCHED TUBES", "SOUTH SIDE"],
    southpacking: ["PACKING", "SOUTH SIDE"],
    southmanualpacking: ["MANUAL PACKING", "SOUTH SIDE"],
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