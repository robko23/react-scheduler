import { addMinutes, getHours, getMinutes, isToday, set } from "date-fns"
import React, { memo } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { GridCell } from "../../styles/styles"
import { EmptyCell, WeekCellProps } from "./EmptyCell"


export type RowProps = Omit<WeekCellProps & {
	daysList: Date[],
	step: number,
	hour: Date,
}, 'start' | 'end' | 'day'>

export const Row = memo((props: RowProps) => {
	const {view} = useCalendarProps()

	let days: JSX.Element[] = []
	// using classic for loop for performance
	for ( let dayIndex = 0; dayIndex < props.daysList.length; dayIndex++ ) {
		const day = props.daysList[dayIndex]
		const start = set(day, {
			hours: getHours(props.hour),
			minutes: getMinutes(props.hour)
		})
		const end = addMinutes(start, props.step)

		days.push((
			<GridCell today={isToday((day)) && view === 'week'}>
				<EmptyCell
					{...props}
					start={start}
					day={day}
					end={end}
				/>
			</GridCell>
		))
	}
	return <>{days}</>
})