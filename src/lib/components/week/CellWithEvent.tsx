import { addMinutes, differenceInDays, getHours, getMinutes, isSameDay, isToday, set } from "date-fns"
import React, { memo, ReactElement, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useAppState } from "../../hooks/useAppState"
import { GridCell } from "../../styles/styles"
import { ProcessedEvent } from "../../types"
import TodayEvents from "../events/TodayEvents"
import { EmptyCell } from "./EmptyCell"

type Props = {
	hour: Date,
	step: number,
	hourIndex: number,
	day: Date,
	startHour: number,
	events: ProcessedEvent[]
}

export const CellWithEvent = memo((props: Props): ReactElement => {
	const {direction, view} = useAppState()
	const ref = useRef<HTMLButtonElement | null>(null)
	const [ minuteHeight, setMinuteHeight ] = useState<number | null>(null)

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

	useLayoutEffect(() => {
		if ( ref.current && props.hourIndex === 0 && todayEvents.length > 0 ) {
			setMinuteHeight(ref.current?.getBoundingClientRect()?.height / props.step)
		}
	}, [ ref.current, todayEvents ])

	return (
		<GridCell today={isToday((props.day)) && view === 'week'}>

			{/* Events of each day - run once on the top hour column */}
			{props.hourIndex === 0 && minuteHeight &&
                <TodayEvents
                    todayEvents={todayEvents}
                    today={props.day}
                    minuteHeight={minuteHeight}
                    startHour={props.startHour}
                    step={props.step}
                    direction={direction}/>
			}

			<EmptyCell
				{...props}
				start={start}
				day={props.day}
				end={end}
				ref={ref}
			/>
		</GridCell>
	)
})