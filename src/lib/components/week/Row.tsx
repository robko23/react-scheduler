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
	const days = props.daysList.map((day) => {
		const start = set(day, {
			hours: getHours(props.hour),
			minutes: getMinutes(props.hour)
		})
		const end = addMinutes(start, props.step)

		return (
			<GridCell today={isToday((day)) && view === 'week'}>
				<EmptyCell
					{...props}
					start={start}
					day={day}
					end={end}
				/>
			</GridCell>
		)
	})

	//	<CellWithEvent {...props} day={day} key={day.toISOString()}/>
	return <>{days}</>
})