export const Day1 = new Date(Date.now() - 28800000).toLocaleDateString("en-US")

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
  OEE: (Model) => PercentStyleForOEE(((parseFloat(Model.Q) * parseFloat(Model.A) * parseFloat(Model.P)) / 1000000) || 0)
}