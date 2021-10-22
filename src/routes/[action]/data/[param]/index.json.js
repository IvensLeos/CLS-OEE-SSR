import { DatabaseConnection } from '$lib/db/mongodb'
import { GenerateAggregation } from '../../../../hooks'

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
    }

    if (action === 'review') {
      const Connection = await DatabaseConnection()
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
      return {
        status: 200,
        body: {}
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