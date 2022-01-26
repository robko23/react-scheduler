import { ProcessedEvent } from "../../types"
import { CellWithEvent } from "./CellWithEvent"
import { WeekCellProps } from "./EmptyCell"
import React from "react"

export type RowProps = Omit<WeekCellProps & {
	hourIndex: number,
	daysList: Date[],
	step: number,
	resourcedEvents: ProcessedEvent[],
	hour: Date,
	startHour: number
}, 'start' | 'end' | 'day'>

export const Row = (props: RowProps) => {
	const days = props.daysList.map((day) =>
		<CellWithEvent {...props} day={day} key={day.toISOString()}/>
	)

	return <>{days}</>
}