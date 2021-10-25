export const Day1 = new Date(Date.now() - 28800000).toLocaleDateString("en-US")
export const Day2 = new Date(Date.now() + 57600000).toLocaleDateString("en-US")

export const PercentStyleForOEE = (Value) => {
  if (Value > 1) Value = 1
  else if (Value < 0) Value = 0
  return Value.toLocaleString("en", { style: "percent", minimumFractionDigits: 0 })
}

export const Calculate = {
  TAU: (Model) => PercentStyleForOEE((Number(Model.REAL_AVAILABLE_TIME) / Number(Model.AVAILABLE_TIME)) || 0),
  Q: (Model) => PercentStyleForOEE(Number(Model.PRODUCED) / (Number(Model.PRODUCED) + Number(Model.SCRAP)) || 0),
  A: (Model) => PercentStyleForOEE((Number(Model.REAL_AVAILABLE_TIME) / Number(Model.PLANNED_AVAILABLE_TIME)) || 0),
  P: (Model) => PercentStyleForOEE(((Number(Model.PRODUCED) + Number(Model.SCRAP)) / Number(Model.RATE)) || 0),
  OEE: (Model) => PercentStyleForOEE(((parseFloat(Model.Q) * parseFloat(Model.A) * parseFloat(Model.P)) / 1000000) || 0),
  ParseInt: (ModelElement) => parseInt(ModelElement) || 0,
  Rate: (Model, Rates, Process) => {
    if (Model?.ITEM != undefined) {
      let CurrentRate = Rates?.filter(({ ITEM, MACHINE, WORK_CENTER }) => ITEM === Model?.ITEM.toString().toUpperCase() && MACHINE === Model?.MACHINE_NAME && WORK_CENTER === Process)
      return CurrentRate[0]?.RATE || 0
    }
  },
  Area: (Model, Rates) => {
    if (Model?.ITEM != undefined) {
      let CurrentArea = Rates?.filter(({ ITEM }) => ITEM === Model?.ITEM.toString().toUpperCase())
      return CurrentArea[0]?.ROOT_AREA || ""
    }
  }
}