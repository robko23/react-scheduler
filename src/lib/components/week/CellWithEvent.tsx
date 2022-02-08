import { addMinutes, differenceInDays, getHours, getMinutes, isSameDay, isToday, set } from "date-fns"
import React, { memo, ReactElement, useMemo } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { useThrottledResizeObserver } from "../../hooks/useThrottledObserver"
import { GridCell } from "../../styles/styles"
import { CalendarEvent } from "../../types"
import TodayEvents from "../events/TodayEvents"
import { EmptyCell } from "./EmptyCell"

export type CellWithEventProps = {
	hour: Date,
	step: number,
	day: Date,
	startHour: number,
	events: CalendarEvent[]
}

export const CellWithEvent = memo((props: CellWithEventProps): ReactElement => {
	const {direction, view} = useCalendarProps()
	const {ref, height = 1} = useThrottledResizeObserver<HTMLButtonElement>(100)
	const minuteHeight = height / props.step

	const todayEvents = useMemo(
		() => props.events
			.filter(
				(e) =>
					isSameDay(props.day, e.start) &&
					!differenceInDays(e.end, e.start)
			)
			.sort((a, b) => a.end.getTime() - b.end.getTime()),
		[ props.events, props.day ]
	)


	const start = set(props.day, {
		hours: getHours(props.hour),
		minutes: getMinutes(props.hour)
	})

	const end = addMinutes(start, props.step)

	return (
		<GridCell today={isToday((props.day)) && view === 'week'} ref={ref}>

			{/* Events of each day - run once on the top hour column */}
			<TodayEvents
				todayEvents={todayEvents}
				today={props.day}
				minuteHeight={minuteHeight}
				startHour={props.startHour}
				step={props.step}
				direction={direction ?? "ltr"}/>

			<EmptyCell
				{...props}
				start={start}
				day={props.day}
				end={end}
			/>
		</GridCell>
	)
})