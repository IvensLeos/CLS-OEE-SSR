import { DatabaseConnection } from "../../../../../util/mongodb"

export default async function handler(req, res) {
  const { machine } = req.query

  const Connection = await DatabaseConnection()
  const Collection = Connection.Database.collection("OEE_PER_DAY_PER_MACHINE")

  const MACHINE_OEE_HISTORY = await Collection.find({ "_id": machine }).sort({ OEEDATE: -1 }).toArray()

  res.status(200).json({
    MACHINE_OEE_HISTORY
  })
}