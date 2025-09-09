import dynamic from "next/dynamic"
import Loader from "./component/loader"

const Todo = dynamic(() => import('./component/todo'), {loading: () => <Loader/> })

export default function Main() {
  return (
  <>
  <Todo />
  </>
  )
}
