import { DatabaseConnection } from "../../util/mongodb"
import { GenerateAggregation } from "../../util/hooks"

export default async function handler(req, res) {
  const Connection = await DatabaseConnection()
  const OEECollection = Connection.Database.collection("oees")

  const OEESBYBU = await OEECollection.aggregate(GenerateAggregation("$ROOT_AREA")).toArray()
  const OEESBYPROCESS = await OEECollection.aggregate(GenerateAggregation("$PROCESS")).toArray()
  const OEESBYPLANT = await OEECollection.aggregate(GenerateAggregation("ALL PLANT")).toArray()

  const ParsedOEE = (Result) => Result.map(OEE => { return { ...OEE, ID: OEE._id } })

  res.status(200).json({
    BusinessOEE: [...ParsedOEE(OEESBYBU)],
    ProcessOEE: [...ParsedOEE(OEESBYPROCESS)],
    PlantOEE: [...ParsedOEE(OEESBYPLANT)]
  })
}

// import { DatabaseConnection } from "../../util/mongodb"

// export default async function handler(req, res) {
//   const Connection = await DatabaseConnection()
//   const AreasCollection = Connection.Database.collection("areas")
//   const MachinesCollection = Connection.Database.collection("machines")
//   const RatesCollection = Connection.Database.collection("rates")
//   const ScrapCodesCollection = Connection.Database.collection("scrapcodes")
//   const FailureCodesCollection = Connection.Database.collection("failurecodes")
//   const OEESCollection = Connection.Database.collection("oees")

//   let AREAS = await AreasCollection.find({}).project({ "_id": 0, "AREA": 1 }).toArray()
//   let MACHINES = await MachinesCollection.find({ ACTIVE: true }).project({ "_id": 0, "MACHINE_NAME": 1, "PROCESS": 1 }).toArray()
//   let RATES = await RatesCollection.find({}).project({ "_id": 0, "ITEM": 1, "MACHINE": 1, "RATE": 1, "WORK_CENTER": 1, "ROOT_AREA": 1 }).toArray()
//   let SCRAPCODES = await ScrapCodesCollection.find({}).project({ "_id": 0, "SCRAPCODE": 1 }).toArray()
//   let FAILURECODES = await FailureCodesCollection.find({}).project({ "_id": 0, "FAILURECODE": 1 }).toArray()
//   let OEES = await OEESCollection.find({}).project({ "_id": 0 }).toArray()

//   res.status(200).json({
//     MACHINES
//   })
// }