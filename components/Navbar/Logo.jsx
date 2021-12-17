import Image from "next/image"

const Logo = () => {
  return (
    <>
      <Image src="/Logo.png" alt="Logo" width={110} height={18} className="Logo2" />
      <style jsx>{`
        :global(.Logo2) {
          margin-left: -2px !important;
        }
      `}</style>
    </>
  )
}

export default Logo