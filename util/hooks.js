// export const Day1 = new Date(Date.now() - 28800000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
// export const Day2 = new Date(Date.now() + 57600000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
export const Day1 = new Date(Date.now() - 115200000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
export const Day2 = new Date(Date.now() - 28800000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })

export const NewGTE = () => {
  let Day1 = new Date(Date.now() - 115200000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
  // console.log({Day1})
  return new Date(Day1 + " 08:00:00 AM UTC")
}

export const NewLT = () => {
  let Day2 = new Date(Date.now() - 28800000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
  // console.log({Day2})
  return new Date(Day2 + " 08:00:00 AM UTC")
}

export const NewOEE = () => {
  let Day3 = new Date(Date.now() - 115200000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
  // console.log({Day3})
  return new Date(Day3 + " 00:00:00 AM UTC")
}

export const GenerateAggregation = (GROUP_ID, MATCH_ROOT_AREA) => {
  return [
    {
      $addFields: {
        "UNPLANNED_DOWNTIME": { $round: [{ $sum: { $cond: { if: { $eq: [{ $substr: ["$TIME_LOST_COMMENT", 0, 3] }, "FA-"] }, then: { $divide: ["$TIME_LOST", 60] }, else: 0 } } }, 0] },
        "PLANNED_DOWNTIME": { $round: [{ $sum: { $cond: { if: { $eq: [{ $substr: ["$TIME_LOST_COMMENT", 0, 3] }, "PD-"] }, then: { $divide: ["$TIME_LOST", 60] }, else: 0 } } }, 0] }
      }
    },
    {
      $match: {
        "DATETIME": {
          $gte: new Date(NewGTE()),
          $lt: new Date(NewLT()),
        },
        "ROOT_AREA": MATCH_ROOT_AREA || { $ne: ["IMPOSIBLE_AREA"] }
      }
    },
    {
      $addFields: {
        "AVAILABLE_TIME": 1,
        "PLANNED_AVAILABLE_TIME": { $round: [{ $subtract: [1, "$PLANNED_DOWNTIME"] }, 0] },
        "REAL_AVAILABLE_TIME": { $round: [{ $divide: [{ $subtract: [60, "$TIME_LOST"] }, 60] }, 0] },
      }
    },
    {
      $group: {
        "_id": GROUP_ID,
        "PROCESS": { $first: "$PROCESS" },
        "ITEM": { $last: '$ITEM' },
        "RATE": { $sum: '$RATE' },
        "PRODUCED": { $sum: '$PRODUCED' },
        "SCRAP": { $sum: '$SCRAP' },
        "AVAILABLE_TIME": { $sum: '$AVAILABLE_TIME' },
        "PLANNED_DOWNTIME": { $sum: '$PLANNED_DOWNTIME' },
        "UNPLANNED_DOWNTIME": { $sum: '$UNPLANNED_DOWNTIME' },
        "REAL_AVAILABLE_TIME": { $sum: '$REAL_AVAILABLE_TIME' },
        "PLANNED_AVAILABLE_TIME": { $sum: "$PLANNED_AVAILABLE_TIME" }
      }
    }
  ]
}

export const PercentStyleForOEE = (Value) => {
  if (Value > 1) Value = 1
  else if (Value < 0) Value = 0
  return Value.toLocaleString("en", { style: "percent", minimumFractionDigits: 2 })
}

export const Calculate = {
  TAU: (Model) => PercentStyleForOEE((Number(Model.REAL_AVAILABLE_TIME) / Number(Model.AVAILABLE_TIME)) || 0),
  Q: (Model) => PercentStyleForOEE(Number(Model.PRODUCED) / (Number(Model.PRODUCED) + Number(Model.SCRAP)) || 1),
  A: (Model) => PercentStyleForOEE((Number(Model.REAL_AVAILABLE_TIME) / Number(Model.PLANNED_AVAILABLE_TIME)) || 0),
  P: (Model) => PercentStyleForOEE(((Number(Model.PRODUCED) + Number(Model.SCRAP)) / Number(Model.RATE)) || 0),
  A2: (Model) => PercentStyleForOEE(((60 - Number(Model.TIME_LOST)) / 60) || 0),
  OEE: (Model) => PercentStyleForOEE(((parseFloat(Model.Q) * parseFloat(Model.A) * parseFloat(Model.P)) / 1000000) || 0),
  ParseInt: (ModelElement) => parseInt(ModelElement) || 0,
}

export const ClientDateToUTCDate = () => {
  CurrentClientDate = new Date
  return new Date(new Date(Date.now()).getTime() - CurrentClientDate.getTimezoneOffset() * 60 * 1000)
}