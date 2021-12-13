import { DatabaseConnection } from "../../util/mongodb"

export default async function handler(req, res) {
  const Connection = await DatabaseConnection()
  const FailureCodesCollection = Connection.Database.collection("failurecodes")
  const FAILURECODES = await FailureCodesCollection.find({}).map(Key => Key.FAILURECODE).toArray()

  res.status(200).json({
    FAILURECODES
  })
}