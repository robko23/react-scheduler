import { addMinutes, differenceInDays, format, isSameDay, isToday } from "date-fns"
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
	resourcedEvents: ProcessedEvent[]
}

export const CellWithEvent = memo((props: Props): ReactElement => {
	const {direction, locale, view} = useAppState()
	const ref = useRef<HTMLButtonElement | null>(null)
	const [ minuteHeight, setMinuteHeight ] = useState<number | null>(null)

	const todayEvents = useMemo(() => props.resourcedEvents
		.filter(
			(e) =>
				isSameDay(props.day, e.start) &&
				!differenceInDays(e.end, e.start)
		)
		.sort((a, b) => a.end.getTime() - b.end.getTime()), [ props.resourcedEvents ])

	const start = new Date(
		`${format(props.day, "yyyy MM dd", {locale: locale})}
			 ${format(props.hour, "hh:mm a", {locale: locale})}`
	)

	const end = new Date(
		`${format(props.day, "yyyy MM dd")} ${format(
			addMinutes(props.hour, props.step),
			"hh:mm a"
		)}`
	)

	useLayoutEffect(() => {
		if ( ref.current && props.hourIndex === 0 && todayEvents.length > 0 ) {
			setMinuteHeight(ref.current?.getBoundingClientRect()?.height / props.step)
		}
	}, [ ref.current ])

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