export const Day1 = new Date(Date.now() - 28800000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })
export const Day2 = new Date(Date.now() + 57600000).toLocaleDateString("en-US", { timeZone: "America/Chicago" })

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

export const ConvertJSDateToExcelDate = (Data) => {
  if (Data.data.data[0].DATETIME) {
    let InternalData = Data.data.data
    for (const Row in InternalData) {
      let FormatedDate = new Date(InternalData[Row].DATETIME)
      let ExcelDate = 25569.0 + ((FormatedDate.getTime() - (FormatedDate.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24))
      let DATETIME = ExcelDate.toString().substr(0, 20)
      InternalData[Row] = { ...InternalData[Row], DATETIME }
    }
  }
}

export const ClientDateToUTCDate = () => {
  CurrentClientDate = new Date
  return new Date(new Date(Date.now()).getTime() - CurrentClientDate.getTimezoneOffset() * 60 * 1000)
}