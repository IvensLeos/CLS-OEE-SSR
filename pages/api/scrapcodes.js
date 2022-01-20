import { DatabaseConnection } from "../../util/mongodb"

export default async function handler(req, res) {
  const Connection = await DatabaseConnection()
  const ScrapCodesCollection = Connection.Database.collection("scrapcodes")
  const SCRAPCODES = await ScrapCodesCollection.find({}).project({ "_id": 0, "SCRAPCODE": 1 }).map(Key => Key.SCRAPCODE).toArray()

  res.status(200).json({
    SCRAPCODES
  })
}