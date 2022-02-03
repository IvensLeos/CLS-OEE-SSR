import Script from "next/script"
import ReviewGrid from "../../../../components/Revogrid/ReviewGrid"

export const getServerSideProps = async ({ params }) => {
  const Area = params.area
  const Data = await fetch(process.env.SITE_URL + "api/review/data/production/" + Area).then(r => r.json())

  const { OEES } = Data

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
    roundbottom: "ROUND BOTTOM",
    genomics: "GENOMICS",
    buyouts: "BUYOUTS"
  }

  return {
    props: {
      Params: [
        { Area: ResolveParam[Area], Process: "MOLDING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "MOLDING") },
        { Area: ResolveParam[Area], Process: "PRINTING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "PRINTING") },
        { Area: ResolveParam[Area], Process: "PRINTING & ASSEMBLING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "PRINTING & ASSEMBLING") },
        { Area: ResolveParam[Area], Process: "WASHING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "WASHING") },
        { Area: ResolveParam[Area], Process: "ASSEMBLING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "ASSEMBLING") },
        { Area: ResolveParam[Area], Process: "ASSEMBLING & PACKING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "ASSEMBLING & PACKING") },
        { Area: ResolveParam[Area], Process: "PACKING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "PACKING") },
        { Area: ResolveParam[Area], Process: "MANUAL PACKING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "MANUAL PACKING") },
        { Area: ResolveParam[Area], Process: "MOLDING Q1", Data: OEES?.filter(({ PROCESS }) => PROCESS === "MOLDING Q1") },
        { Area: ResolveParam[Area], Process: "MOLDING Q2", Data: OEES?.filter(({ PROCESS }) => PROCESS === "MOLDING Q2") },
        { Area: ResolveParam[Area], Process: "MOLDING Q3", Data: OEES?.filter(({ PROCESS }) => PROCESS === "MOLDING Q3") },
        { Area: ResolveParam[Area], Process: "MOLDING Q4", Data: OEES?.filter(({ PROCESS }) => PROCESS === "MOLDING Q4") },
        { Area: ResolveParam[Area], Process: "PAD PRINTING", Data: OEES?.filter(({ PROCESS }) => PROCESS === "PAD PRINTING") },
      ]
    }
  }
}

const ReviewDataArea = ({ Params }) => {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@revolist/revogrid@3.0.98/dist/revo-grid/revo-grid.js" strategy="afterInteractive" />
      {Params.map(({ Data, Area, Process }) => {
        if (Data.length > 0) {
          return (
            <ReviewGrid key={Process} OEES={Data} Area={Area} Process={Process} />
          )
        }
      })}
      <br />
    </>
  )
}

export default ReviewDataArea