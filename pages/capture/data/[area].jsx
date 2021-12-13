import { useRouter } from "next/router"

export default () => {
  let Area = useRouter().query.area

  return (
    <h1>{Area}</h1>
  )
}