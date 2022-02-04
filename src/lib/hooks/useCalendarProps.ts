import { useContext } from "react"
import { StateContext } from "../context/state/stateContext"
import { SchedulerProps } from "../types"

const useCalendarProps = (): SchedulerProps => useContext(StateContext)

export { useCalendarProps }
