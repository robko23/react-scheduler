import { addDays, format, setHours } from "date-fns"
import React from "react"
import { CellRenderedProps, DayHours } from "../../types"
import { WeekDays } from "../../views/Month"
import { MonthCell } from "./MonthCell"

type MonthRowProps = {
	eachWeekStart: Date[],
	weekDays: WeekDays[],
	startHour: DayHours,
	endHour: DayHours,
	cellRenderer?(props: CellRenderedProps): JSX.Element;
	daysList: Date[],
	monthStart: Date
}


export const MonthRows = ({
	cellRenderer, eachWeekStart, endHour, startHour, weekDays, daysList, monthStart
}: MonthRowProps) => {

	const rows: JSX.Element[] = eachWeekStart.map(startDay => {
		const endDay = addDays(startDay, weekDays[weekDays.length - 1])
		return weekDays.map((day) => {
			const today = addDays(startDay, day)
			const start = new Date(
				`${format(setHours(today, startHour), "yyyy MM dd hh:mm a")}`
			)
			const end = new Date(
				`${format(setHours(today, endHour), "yyyy MM dd hh:mm a")}`
			)

			return <MonthCell
				key={start.toString()}
				daysList={daysList}
				monthStart={monthStart}
				end={end}
				start={start}
				day={day}
				endDay={endDay}
				startDay={startDay}
				today={today}
				weekDays={weekDays}
				cellRenderer={cellRenderer}/>

		})
	}).flat(1)

	return <>{rows}</>
}