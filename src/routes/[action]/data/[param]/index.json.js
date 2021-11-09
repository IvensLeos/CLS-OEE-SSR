import { DatabaseConnection } from '$lib/db/mongodb'
import { GenerateAggregation, NewOEE } from '../../../../hooks'

export async function get(request) {
  try {
    const { action, param } = request.params

    const ResolveParam = {
      cryo: "CRYO",
      tips: "TIP'S",
      mcts: "MCT'S",
      scts: "SCT'S",
      cell: "CELL",
      beaker: "BEAKER",
      reservoir: "RESERVOIR",
      ctscorning: "CT'S CORNING",
      ctsfalcon: "CT'S FALCON",
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

    if (action === 'review') {
      const OEECollection = Connection.Database.collection('oees')

      const OEESBYAREAPROCESSBYMACHINE = await OEECollection.aggregate(GenerateAggregation("$MACHINE_NAME", ResolveParam[param])).toArray()

      const ParsedResult = (Result) => Result.map(OEE => { return { ...OEE, ID: OEE._id } })

      return {
        status: 200,
        body: {
          OEES: [ ...ParsedResult(OEESBYAREAPROCESSBYMACHINE) ]
        }
      }
    }

    else if (action === 'capture') {
      const MachinesCollection = Connection.Database.collection("machines")
      const MACHINES = await MachinesCollection.find({ "ACTIVE": true, "PROCESS": ResolveParam[param] }).sort({ "MACHINE_NAME": 1 }).toArray()

      const OEESCollection = Connection.Database.collection("oees")
      const OEES = await OEESCollection.find({ "OEEDATE": NewOEE() }).toArray()

      return {
        status: 200,
        body: {
          MACHINES,
          OEES
        }
      }
    }
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Server error'
      }
    }
  }
}

export async function post(request) {
  try {
    const OEEDATA = JSON.parse(request.body)

    const Connection = await DatabaseConnection()
    const OEESCollection = Connection.Database.collection("oees")
    
    const { IDENTIFIER } = OEEDATA
    
    const FindAndUpdateOEE = await OEESCollection.findOneAndUpdate({ IDENTIFIER }, { "$set": { ...OEEDATA, DATETIME: new Date(OEEDATA.DATETIME), OEEDATE: NewOEE() } })
    
    if (!FindAndUpdateOEE.value) {
      await OEESCollection.insertOne({ ...OEEDATA, DATETIME: new Date(OEEDATA.DATETIME), OEEDATE: NewOEE() })
    }

    return {
      status: 200,
      body: {
        Update: "OK"
      }
    }
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Server error'
      }
    }
  }
}