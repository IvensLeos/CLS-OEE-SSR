const Logo = () => {
  return (
    <>
      <img src="/Logo.png" alt="Logo" width={110} height={18} className="Logo" />
      <style jsx>{`
        :global(.Logo) {
          margin-left: -5px !important;
        }
      `}</style>
    </>
  )
}

export default Logo