export const Day1 = new Date(Date.now() - 115200000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
export const Day2 = new Date(Date.now() - 28800000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })

export const NewGTE = () => {
  let Day1 = new Date(Date.now() - 115200000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
  return new Date(Day1 + " 08:00:00 AM UTC")
}

export const NewLT = () => {
  let Day2 = new Date(Date.now() - 28800000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
  return new Date(Day2 + " 08:00:00 AM UTC")
}


export const NewOEE = () => {
  let Day3 = new Date(Date.now() - 115200000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
  return new Date(Day3 + " 00:00:00 AM UTC")
}

export const GenerateAggregation = (GROUP_ID, MATCH_ROOT_AREA) => {
  return [
    {
      $addFields: {
        "UNPLANNED_DOWNTIME": { $sum: { $cond: { if: { $eq: [{ $substr: ["$TIME_LOST_COMMENT", 0, 3] }, "FA-"] }, then: { $divide: ["$TIME_LOST", 60] }, else: 0 } } },
        "PLANNED_DOWNTIME": { $sum: { $cond: { if: { $eq: [{ $substr: ["$TIME_LOST_COMMENT", 0, 3] }, "PD-"] }, then: { $divide: ["$TIME_LOST", 60] }, else: 0 } } },
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
        "PLANNED_AVAILABLE_TIME": { $subtract: [1, "$PLANNED_DOWNTIME"] },
        "REAL_AVAILABLE_TIME": { $divide: [{ $subtract: [60, "$TIME_LOST"] }, 60 ] }
      }
    },
    {
      $group: {
        "_id": GROUP_ID,
        "ROOT_PROCESS": { $first: "$ROOT_PROCESS" },
        "PROCESS": { $first: "$PROCESS" },
        "ROOT_AREA": { $first: "$ROOT_AREA" },
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

let OEEPERDAYPERMACHINE = [
  {
    "$match": {
      "ROOT_AREA": {
        "$ne": ""
      },
      "OEEDATE": new Date("Sun Feb 27 2022 18:00:00 GMT-0600 (Central Standard Time)")
    }
  },
  {
    "$addFields": {
      "UNPLANNED_DOWNTIME": {
        "$sum": {
          "$cond": {
            "if": {
              "$eq": [
                {
                  "$substr": [
                    "$TIME_LOST_COMMENT",
                    0,
                    3
                  ]
                },
                "FA-"
              ]
            },
            "then": {
              "$divide": [
                "$TIME_LOST",
                60
              ]
            },
            "else": 0
          }
        }
      },
      "PLANNED_DOWNTIME": {
        "$sum": {
          "$cond": {
            "if": {
              "$eq": [
                {
                  "$substr": [
                    "$TIME_LOST_COMMENT",
                    0,
                    3
                  ]
                },
                "PD-"
              ]
            },
            "then": {
              "$divide": [
                "$TIME_LOST",
                60
              ]
            },
            "else": 0
          }
        }
      }
    }
  },
  {
    "$addFields": {
      "AVAILABLE_TIME": 1,
      "PLANNED_AVAILABLE_TIME": {
        "$subtract": [
          1,
          "$PLANNED_DOWNTIME"
        ]
      },
      "REAL_AVAILABLE_TIME": {
        "$divide": [
          {
            "$subtract": [
              60,
              "$TIME_LOST"
            ]
          },
          60
        ]
      }
    }
  },
  {
    "$group": {
      "_id": {
        "ROOT_AREA": "$ROOT_AREA",
        "OEEDATE": "$OEEDATE",
        "MACHINE_NAME": "$MACHINE_NAME"
      },
      "PRODUCED": {
        "$sum": "$PRODUCED"
      },
      "RATE": {
        "$sum": "$RATE"
      },
      "SCRAP": {
        "$sum": "$SCRAP"
      },
      "AVAILABLE_TIME": {
        "$sum": "$AVAILABLE_TIME"
      },
      "PLANNED_AVAILABLE_TIME": {
        "$sum": "$PLANNED_AVAILABLE_TIME"
      },
      "PLANNED_DOWNTIME": {
        "$sum": "$PLANNED_DOWNTIME"
      },
      "UNPLANNED_DOWNTIME": {
        "$sum": "$UNPLANNED_DOWNTIME"
      },
      "REAL_AVAILABLE_TIME": {
        "$sum": "$REAL_AVAILABLE_TIME"
      }
    }
  },
  {
    "$group": {
      "_id": {
        "MACHINE_NAME": "$_id.MACHINE_NAME",
        "OEEDATE": "$_id.OEEDATE"
      },
      "RATE": {
        "$sum": "$RATE"
      },
      "PRODUCED": {
        "$sum": "$PRODUCED"
      },
      "SCRAP": {
        "$sum": "$SCRAP"
      },
      "AVAILABLE_TIME": {
        "$sum": "$AVAILABLE_TIME"
      },
      "PLANNED_AVAILABLE_TIME": {
        "$sum": "$PLANNED_AVAILABLE_TIME"
      },
      "PLANNED_DOWNTIME": {
        "$sum": "$PLANNED_DOWNTIME"
      },
      "UNPLANNED_DOWNTIME": {
        "$sum": "$UNPLANNED_DOWNTIME"
      },
      "REAL_AVAILABLE_TIME": {
        "$sum": "$REAL_AVAILABLE_TIME"
      }
    }
  },
  {
    "$project": {
      "_id": "$_id.MACHINE_NAME",
      "OEEDATE": "$_id.OEEDATE",
      "RATE": "$RATE",
      "PRODUCED": "$PRODUCED",
      "SCRAP": "$SCRAP",
      "AVAILABLE_TIME": "$AVAILABLE_TIME",
      "PLANNED_AVAILABLE_TIME": "$PLANNED_AVAILABLE_TIME",
      "PLANNED_DOWNTIME": "$PLANNED_DOWNTIME",
      "UNPLANNED_DOWNTIME": "$UNPLANNED_DOWNTIME",
      "REAL_AVAILABLE_TIME": "$REAL_AVAILABLE_TIME",
      "TAU": {
        "$divide": [
          "$REAL_AVAILABLE_TIME",
          "$AVAILABLE_TIME"
        ]
      },
      "Q": {
        "$cond": {
          "if": {
            "$eq": [
              "$PRODUCED",
              0
            ]
          },
          "then": 1,
          "else": {
            "$divide": [
              "$PRODUCED",
              {
                "$sum": [
                  "$PRODUCED",
                  "$SCRAP"
                ]
              }
            ]
          }
        }
      },
      "A": {
        "$cond": {
          "if": {
            "$eq": [
              "$REAL_AVAILABLE_TIME",
              0
            ]
          },
          "then": 0,
          "else": {
            "$divide": [
              "$REAL_AVAILABLE_TIME",
              "$PLANNED_AVAILABLE_TIME"
            ]
          }
        }
      },
      "P": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$cond": {
                  "if": {
                    "$eq": [
                      "$RATE",
                      0
                    ]
                  },
                  "then": 0,
                  "else": {
                    "$divide": [
                      {
                        "$sum": [
                          "$PRODUCED",
                          "$SCRAP"
                        ]
                      },
                      "$RATE"
                    ]
                  }
                }
              },
              1
            ]
          },
          "then": 1,
          "else": {
            "$cond": {
              "if": {
                "$eq": [
                  "$RATE",
                  0
                ]
              },
              "then": 0,
              "else": {
                "$divide": [
                  {
                    "$sum": [
                      "$PRODUCED",
                      "$SCRAP"
                    ]
                  },
                  "$RATE"
                ]
              }
            }
          }
        }
      }
    }
  },
  {
    "$project": {
      "_id": "$_id",
      "OEEDATE": "$OEEDATE",
      "RATE": "$RATE",
      "PRODUCED": "$PRODUCED",
      "SCRAP": "$SCRAP",
      "AVAILABLE_TIME": "$AVAILABLE_TIME",
      "PLANNED_AVAILABLE_TIME": "$PLANNED_AVAILABLE_TIME",
      "PLANNED_DOWNTIME": "$PLANNED_DOWNTIME",
      "UNPLANNED_DOWNTIME": "$UNPLANNED_DOWNTIME",
      "REAL_AVAILABLE_TIME": "$REAL_AVAILABLE_TIME",
      "TAU": "$TAU",
      "Q": "$Q",
      "A": "$A",
      "P": "$P",
      "OEE": {
        "$multiply": [
          "$Q",
          "$A",
          "$P"
        ]
      }
    }
  }
]

let OEEPERDAYPERMACHINE2 = [
  {
    "$match": {
      "ROOT_AREA": {
        "$ne": ""
      }
    }
  },
  {
    "$addFields": {
      "UNPLANNED_DOWNTIME": {
        "$sum": {
          "$cond": {
            "if": {
              "$eq": [
                {
                  "$substr": [
                    "$TIME_LOST_COMMENT",
                    0,
                    3
                  ]
                },
                "FA-"
              ]
            },
            "then": {
              "$divide": [
                "$TIME_LOST",
                60
              ]
            },
            "else": 0
          }
        }
      },
      "PLANNED_DOWNTIME": {
        "$sum": {
          "$cond": {
            "if": {
              "$eq": [
                {
                  "$substr": [
                    "$TIME_LOST_COMMENT",
                    0,
                    3
                  ]
                },
                "PD-"
              ]
            },
            "then": {
              "$divide": [
                "$TIME_LOST",
                60
              ]
            },
            "else": 0
          }
        }
      }
    }
  },
  {
    "$addFields": {
      "AVAILABLE_TIME": 1,
      "PLANNED_AVAILABLE_TIME": {
        "$subtract": [
          1,
          "$PLANNED_DOWNTIME"
        ]
      },
      "REAL_AVAILABLE_TIME": {
        "$divide": [
          {
            "$subtract": [
              60,
              "$TIME_LOST"
            ]
          },
          60
        ]
      }
    }
  },
  {
    "$group": {
      "_id": {
        "ROOT_AREA": "$ROOT_AREA",
        "OEEDATE": "$OEEDATE",
        "MACHINE_NAME": "$MACHINE_NAME",
        "ITEM": "$ITEM"
      },
      "PRODUCED": {
        "$sum": "$PRODUCED"
      },
      "RATE": {
        "$sum": "$RATE"
      },
      "SCRAP": {
        "$sum": "$SCRAP"
      },
      "AVAILABLE_TIME": {
        "$sum": "$AVAILABLE_TIME"
      },
      "PLANNED_AVAILABLE_TIME": {
        "$sum": "$PLANNED_AVAILABLE_TIME"
      },
      "PLANNED_DOWNTIME": {
        "$sum": "$PLANNED_DOWNTIME"
      },
      "UNPLANNED_DOWNTIME": {
        "$sum": "$UNPLANNED_DOWNTIME"
      },
      "REAL_AVAILABLE_TIME": {
        "$sum": "$REAL_AVAILABLE_TIME"
      }
    }
  },
  {
    "$group": {
      "_id": {
        "MACHINE_NAME": "$_id.MACHINE_NAME",
        "OEEDATE": "$_id.OEEDATE",
        "ROOT_AREA": "$_id.ROOT_AREA",
        "ITEM": "$_id.ITEM"
      },
      "RATE": {
        "$sum": "$RATE"
      },
      "PRODUCED": {
        "$sum": "$PRODUCED"
      },
      "SCRAP": {
        "$sum": "$SCRAP"
      },
      "AVAILABLE_TIME": {
        "$sum": "$AVAILABLE_TIME"
      },
      "PLANNED_AVAILABLE_TIME": {
        "$sum": "$PLANNED_AVAILABLE_TIME"
      },
      "PLANNED_DOWNTIME": {
        "$sum": "$PLANNED_DOWNTIME"
      },
      "UNPLANNED_DOWNTIME": {
        "$sum": "$UNPLANNED_DOWNTIME"
      },
      "REAL_AVAILABLE_TIME": {
        "$sum": "$REAL_AVAILABLE_TIME"
      }
    }
  },
  {
    "$project": {
      "_id": "$_id.MACHINE_NAME",
      "OEEDATE": "$_id.OEEDATE",
      "ROOT_AREA": "$_id.ROOT_AREA",
      "ITEM": "$_id.ITEM",
      "RATE": "$RATE",
      "PRODUCED": "$PRODUCED",
      "SCRAP": "$SCRAP",
      "AVAILABLE_TIME": "$AVAILABLE_TIME",
      "PLANNED_AVAILABLE_TIME": "$PLANNED_AVAILABLE_TIME",
      "PLANNED_DOWNTIME": "$PLANNED_DOWNTIME",
      "UNPLANNED_DOWNTIME": "$UNPLANNED_DOWNTIME",
      "REAL_AVAILABLE_TIME": "$REAL_AVAILABLE_TIME",
      "TAU": {
        "$divide": [
          "$REAL_AVAILABLE_TIME",
          "$AVAILABLE_TIME"
        ]
      },
      "Q": {
        "$cond": {
          "if": {
            "$eq": [
              "$PRODUCED",
              0
            ]
          },
          "then": 1,
          "else": {
            "$divide": [
              "$PRODUCED",
              {
                "$sum": [
                  "$PRODUCED",
                  "$SCRAP"
                ]
              }
            ]
          }
        }
      },
      "A": {
        "$cond": {
          "if": {
            "$eq": [
              "$REAL_AVAILABLE_TIME",
              0
            ]
          },
          "then": 0,
          "else": {
            "$divide": [
              "$REAL_AVAILABLE_TIME",
              "$PLANNED_AVAILABLE_TIME"
            ]
          }
        }
      },
      "P": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$cond": {
                  "if": {
                    "$eq": [
                      "$RATE",
                      0
                    ]
                  },
                  "then": 0,
                  "else": {
                    "$divide": [
                      {
                        "$sum": [
                          "$PRODUCED",
                          "$SCRAP"
                        ]
                      },
                      "$RATE"
                    ]
                  }
                }
              },
              1
            ]
          },
          "then": 1,
          "else": {
            "$cond": {
              "if": {
                "$eq": [
                  "$RATE",
                  0
                ]
              },
              "then": 0,
              "else": {
                "$divide": [
                  {
                    "$sum": [
                      "$PRODUCED",
                      "$SCRAP"
                    ]
                  },
                  "$RATE"
                ]
              }
            }
          }
        }
      }
    }
  },
  {
    "$project": {
      "_id": "$_id",
      "OEEDATE": "$OEEDATE",
      "ROOT_AREA": "$ROOT_AREA",
      "ITEM": "$ITEM",
      "RATE": "$RATE",
      "PRODUCED": "$PRODUCED",
      "SCRAP": "$SCRAP",
      "AVAILABLE_TIME": "$AVAILABLE_TIME",
      "PLANNED_AVAILABLE_TIME": "$PLANNED_AVAILABLE_TIME",
      "PLANNED_DOWNTIME": "$PLANNED_DOWNTIME",
      "UNPLANNED_DOWNTIME": "$UNPLANNED_DOWNTIME",
      "REAL_AVAILABLE_TIME": "$REAL_AVAILABLE_TIME",
      "TAU": "$TAU",
      "Q": "$Q",
      "A": "$A",
      "P": "$P",
      "OEE": {
        "$multiply": [
          "$Q",
          "$A",
          "$P"
        ]
      }
    }
  }
]