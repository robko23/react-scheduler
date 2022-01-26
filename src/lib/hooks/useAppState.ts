import { useContext } from "react"
import { stateContext, StateContext } from "../context/state/stateContext"

const useAppState = (): stateContext => useContext(StateContext)

export { useAppState }
