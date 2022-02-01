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
  const MachinesCollection = Connection.Database.collection("machines")
  
  let MACHINES

  if (req.method === "GET") {
    MACHINES = await MachinesCollection.find({ "ACTIVE": true }).project({ "_id": 0, "MACHINE_NAME": 1, "PROCESS": 1 }).sort({ "MACHINE_NAME": 1 }).toArray()
  }
  else if (req.method === "POST") {
    MACHINES = await MachinesCollection.find({ "ACTIVE": true, "PROCESS": ResolveParam[Process] }).project({ "_id": 0, "MACHINE_NAME": 1, "PROCESS": 1 }).sort({ "MACHINE_NAME": 1 }).toArray()
  }

  res.status(200).json({
    MACHINES
  })
}