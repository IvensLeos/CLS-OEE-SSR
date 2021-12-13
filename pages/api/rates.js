import { DatabaseConnection } from "../../util/mongodb"

export default async function handler(req, res) {
  const Connection = await DatabaseConnection()
  const RatesCollection = Connection.Database.collection("rates")
  const RATES = await RatesCollection.find({}).toArray()

  res.status(200).json({
    RATES
  })
}