const ExportToCsvButton = ({ Grid, FileName }) => {
  const ExportToCSVForOEE = (Grid, FileName) => {
    Grid.current.getPlugins().then(Plugins => {
      Plugins.forEach(ExportPlugin => ExportPlugin.exportFile && ExportPlugin.exportFile({ filename: FileName }))
    })
  }

  return (
    <>
      <button type="button" className="btn btn-sm btn-success" onClick={() => ExportToCSVForOEE(Grid, FileName)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-spreadsheet-fill" viewBox="0 0 16 16">
          <path d="M6 12v-2h3v2H6z" />
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3V9z" />
        </svg>
        DOWNLOAD EXCEL CSV
      </button>
      <style jsx>{`
        
      `}</style>
      <style jsx>{`
        :global(button) {
          min-width: fit-content;
          float: right;
        }
      `}</style>
    </>
  )
}

export default ExportToCsvButton