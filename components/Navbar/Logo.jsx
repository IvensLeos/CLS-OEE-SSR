import Image from "next/image"

const Logo = () => {
  return (
    <>
      <Image src="/Logo.png" alt="Logo" width={110} height={18} className="Logo" />
      <style jsx>{`
        :global(.Logo) {
          margin-left: -2px !important;
        }
      `}</style>
    </>
  )
}

export default Logo