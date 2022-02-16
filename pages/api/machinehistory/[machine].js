import { DatabaseConnection } from "../../../util/mongodb"

export default async function handler(req, res) {
  const { machine } = req.query

  const Connection = await DatabaseConnection()
  const OEECollection = Connection.Database.collection("oees")

  const MACHINEHISTORY = await OEECollection.find({ "MACHINE_NAME": machine }).project({ "_id": 0, "IDENTIFIER": 0, "PROCESS": 0, "ROOT_PROCESS": 0, "ROWCLASS": 0, "ROOT_AREA": 0, "SCRAP": 0, "ITEM": 0, "MACHINE_NAME": 0 }).sort({ "DATETIME": 1 }).toArray()

  res.status(200).json({
    MACHINEHISTORY
  })
}