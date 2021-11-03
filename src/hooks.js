export const NewGTE = () => {
  let Day1 = new Date(Date.now() - 28800000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
  return new Date(Day1 + " 08:00:00 AM")
}

export const NewLT = () => {
  let Day2 = new Date(Date.now() + 57600000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
  return new Date(Day2 + " 08:00:00 AM")
}

export const NewOEE = () => {
  let Day3 = new Date(Date.now() - 28800000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
  return new Date(Day3 + " 00:00:00 AM")
}

export const CurrentDate = () => {
  let Day3 = new Date(Date.now()).toLocaleTimeString("en-US", { timeZone: "America/Chicago" })
  return Day3
}

export const GenerateAggregation = (GROUP_ID, MATCH_ROOT_AREA) => {
  return [
    {
      $addFields: {
        "UNPLANNED_DOWNTIME": { $sum: { $cond: { if: { $eq: [{ $substr: ["$TIME_LOST_COMMENT", 0, 3] }, "FA-"] }, then: "$TIME_LOST", else: 0 } } },
        "PLANNED_DOWNTIME": { $sum: { $cond: { if: { $eq: [{ $substr: ["$TIME_LOST_COMMENT", 0, 3] }, "PD-"] }, then: "$TIME_LOST", else: 0 } } },
      }
    },
    {
      $match: {
        "DATETIME": {
          $gte: new Date(NewGTE()),
          $lt: new Date(NewLT())
        },
        "ROOT_AREA": MATCH_ROOT_AREA || { $ne: ["IMPOSIBLE_AREA"] }
      }
    },
    {
      $addFields: {
        "AVAILABLE_TIME": 60,
        "PLANNED_AVAILABLE_TIME": { $subtract: [60, "$PLANNED_DOWNTIME"] },
        "REAL_AVAILABLE_TIME": { $subtract: [60, "$TIME_LOST"] },
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