import enUS from "date-fns/locale/en-US"
import { createContext } from "react"
import { SchedulerProps, } from "../../types"

export const defaultProps: SchedulerProps = {
	month: {
		weekDays: [ 0, 1, 2, 3, 4, 5, 6 ],
		weekStartOn: 1,
		startHour: 9,
		endHour: 17,
	},
	week: {
		weekDays: [ 0, 1, 2, 3, 4, 5, 6 ],
		weekStartOn: 1,
		startHour: 6,
		endHour: 17,
		step: 60,
	},
	day: {
		startHour: 6,
		endHour: 17,
		step: 60,
	},
	view: "week",
	selectedDate: new Date(),
	events: [],
	loading: undefined,
	direction: "ltr",
	locale: enUS,
}

const StateContext = createContext<SchedulerProps>({
	...defaultProps,
})

export { StateContext }
