import { DatabaseConnection } from "../../../util/mongodb"

export default async function handler(req, res) {
  const { machine } = req.query

  const Connection = await DatabaseConnection()
  const OEECollection = Connection.Database.collection("oees")

  const MACHINEHISTORY = await OEECollection.find({ "MACHINE_NAME": machine }).project({ "_id": 0 }).sort({ "DATETIME": 1 }).toArray()

  res.status(200).json({
    MACHINEHISTORY
  })
}