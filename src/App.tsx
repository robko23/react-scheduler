import { cs } from 'date-fns/locale'
import React, { useEffect, useState } from "react"
import { View } from "./lib/components/nav/Navigation"
import { Scheduler } from "./lib/Scheduler"
import { EVENTS } from "./model/events"

const App = () => {
	// const [ events, setEvents ] = useState(EVENTS)
	const [ date, setDate ] = useState(new Date())
	const [ view, setView ] = useState<View>('week')

	useEffect(() => {
		console.log(date)
	}, [ date ])

	return (
		<Scheduler
			events={EVENTS}
			onDateChange={setDate}
			onViewChange={setView}
			selectedDate={date}
			view={view}
			locale={cs}
			month={{
				weekDays: [ 0, 1, 2, 3, 4, 5, 6 ],
				weekStartOn: 1,
				startHour: 7,
				endHour: 15,
			}}
			week={{
				startHour: 0,
				endHour: 23,
				step: 60,
				weekDays: [ 0, 1, 2, 3, 4, 5, 6 ],
				weekStartOn: 1
			}}
			sx={{
				height: '100%'
			}}
			disableDrag

		/>
	)
}

export { App }
