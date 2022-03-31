import { DatabaseConnection } from "../../../../../util/mongodb"

export default async function handler(req, res) {
  const { month, day, year } = req.query

  const CustomDateString = month + "/" + day + "/" + year
  const CustomDate = new Date(CustomDateString).toLocaleDateString("en-US", { timeZone: "America/Chicago" })

  const NewOEE = () => {
    let Day3 = new Date(CustomDate).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
    return new Date(Day3 + " 00:00:00 AM UTC")
  }

  const Connection = await DatabaseConnection()
  const OEECollection = Connection.Database.collection("oees")

  const GenerateAggregation = (GROUP_ID, MATCH_ROOT_AREA) => {
    return [
      {
        "$match": {
          "OEEDATE": {
            $eq: new Date(NewOEE()),
          },
          "ROOT_AREA": MATCH_ROOT_AREA || { $ne: ["IMPOSIBLE_AREA"] }
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
          "_id": GROUP_ID,
          "ROOT_PROCESS": {
            "$first": "$ROOT_PROCESS"
          },
          "PROCESS": {
            "$first": "$PROCESS"
          },
          "ROOT_AREA": {
            "$first": "$ROOT_AREA"
          },
          "ITEM": {
            "$last": "$ITEM"
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
          "PLANNED_DOWNTIME": {
            "$sum": "$PLANNED_DOWNTIME"
          },
          "UNPLANNED_DOWNTIME": {
            "$sum": "$UNPLANNED_DOWNTIME"
          },
          "REAL_AVAILABLE_TIME": {
            "$sum": "$REAL_AVAILABLE_TIME"
          },
          "PLANNED_AVAILABLE_TIME": {
            "$sum": "$PLANNED_AVAILABLE_TIME"
          }
        }
      },
      {
        "$addFields": {
          "TAU": {
            "$divide": [
              "$REAL_AVAILABLE_TIME",
              "$AVAILABLE_TIME"
            ]
          },
          "U": {
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
        "$addFields": {
          "OEE": {
            "$multiply": [
              "$Q",
              "$A",
              "$P"
            ]
          },
          "TEEP": {
            "$multiply": [
              "$Q",
              "$A",
              "$P",
              "$U"
            ]
          }
        }
      }
    ]
  }

  const OEESBYBU = await OEECollection.aggregate(GenerateAggregation("$ROOT_AREA")).toArray()
  const OEESBYPROCESS = await OEECollection.aggregate(GenerateAggregation("$ROOT_PROCESS")).toArray()
  const OEESBYPLANT = await OEECollection.aggregate(GenerateAggregation("ALL PLANT")).toArray()

  const ParsedOEE = (Result) => Result.map(OEE => { return { ...OEE, ID: OEE._id } })

  res.status(200).json({
    BusinessOEE: [...ParsedOEE(OEESBYBU)],
    ProcessOEE: [...ParsedOEE(OEESBYPROCESS)],
    PlantOEE: [...ParsedOEE(OEESBYPLANT)]
  })
}