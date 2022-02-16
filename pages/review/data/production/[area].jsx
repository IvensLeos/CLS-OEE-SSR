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
    buyouts: "BUYOUTS",
    molding: "MOLDING",
    printing: "PRINTING",
    printingandassembling: "PRINTING & ASSEMBLING",
    washing: "WASHING",
    assembling: "ASSEMBLING",
    assemblingandpacking: "ASSEMBLING & PACKING", 
    packing: "PACKING",
    manualpacking: "MANUAL PACKING"
  }

  return {
    props: {
      Params: [
        { Area: ResolveParam[Area], Process: "MOLDING", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "MOLDING") },
        { Area: ResolveParam[Area], Process: "PRINTING", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "PRINTING") },
        { Area: ResolveParam[Area], Process: "PRINTING & ASSEMBLING", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "PRINTING & ASSEMBLING") },
        { Area: ResolveParam[Area], Process: "WASHING", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "WASHING") },
        { Area: ResolveParam[Area], Process: "ASSEMBLING", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "ASSEMBLING") },
        { Area: ResolveParam[Area], Process: "ASSEMBLING & PACKING", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "ASSEMBLING & PACKING") },
        { Area: ResolveParam[Area], Process: "PACKING", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "PACKING") },
        { Area: ResolveParam[Area], Process: "MANUAL PACKING", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "MANUAL PACKING") },
        { Area: ResolveParam[Area], Process: "MOLDING Q1", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "MOLDING Q1") },
        { Area: ResolveParam[Area], Process: "MOLDING Q2", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "MOLDING Q2") },
        { Area: ResolveParam[Area], Process: "MOLDING Q3", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "MOLDING Q3") },
        { Area: ResolveParam[Area], Process: "MOLDING Q4", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "MOLDING Q4") },
        { Area: ResolveParam[Area], Process: "PAD PRINTING", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "PAD PRINTING") },
        { Area: ResolveParam[Area], Process: "ASSEMBLING RB", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "ASSEMBLING RB") },
        { Area: ResolveParam[Area], Process: "MANUAL PACKING RB", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "MANUAL PACKING RB") },
        { Area: ResolveParam[Area], Process: "MOLDING RB", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "MOLDING RB") },
        { Area: ResolveParam[Area], Process: "PACKING RB", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "PACKING RB") },
        { Area: ResolveParam[Area], Process: "PRINTING RB", Data: OEES?.filter(({ PROCESS, ROOT_AREA }) => ROOT_AREA === ResolveParam[Area] & PROCESS === "PRINTING RB") },
        { Area: "ALL PLANT", Process: ResolveParam[Area], Data: OEES?.filter(({ ROOT_PROCESS }) => ROOT_PROCESS === ResolveParam[Area]) },
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