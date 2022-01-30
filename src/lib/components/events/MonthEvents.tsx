import { Typography } from "@mui/material"
import {
	clamp,
	compareDesc,
	differenceInDays,
	endOfDay,
	isAfter,
	isBefore,
	isSameDay,
	isWithinInterval,
	startOfDay,
} from "date-fns"
import React, { Fragment, useEffect, useRef } from "react"
import { MONTH_NUMBER_SIZE, MULTI_DAY_EVENT_HEIGHT, } from "../../helpers/constants"
import { useAppState } from "../../hooks/useAppState"
import { ProcessedEvent } from "../../types"
import EventItem from "./EventItem"

interface MonthEventProps {
	events: ProcessedEvent[];
	today: Date;
	daysList: Date[];
	weekStart: Date,
	weekEnd: Date,

	onViewMore(day: Date): void;

	cellSize: number
}

const EMPTY_SLOT: ProcessedEvent = {
	end: new Date(),
	event_id: 'null',
	start: new Date(),
	title: ''
}

let slots: ProcessedEvent[] = []

const MonthEvents = ({
	events,
	today,
	onViewMore,
	weekEnd,
	weekStart,
	cellSize
}: MonthEventProps) => {
	const {localizationTexts} = useAppState()
	const moreRendered = useRef(false)

	const MAX_EVENTS = Math.round(
		(cellSize - MONTH_NUMBER_SIZE) / MULTI_DAY_EVENT_HEIGHT - 1
	)

	if ( slots.length !== MAX_EVENTS || isSameDay(today, weekStart) ) {
		slots = new Array<ProcessedEvent>(MAX_EVENTS).fill(EMPTY_SLOT)
	}

	const todayEvents = events
		.filter((e) =>
			isWithinInterval(today, {
				start: startOfDay(e.start),
				end: endOfDay(e.end)
			})
		)
		.sort((a, b) => compareDesc(a.end, b.end))

	useEffect(() => {
		moreRendered.current = false
	}, [todayEvents])

	return (
		<Fragment>
			{todayEvents.map((event, i) => {

				const fromPrevWeek = isBefore(event.start, weekStart)
				const start = fromPrevWeek ? weekStart : event.start
				let eventLength = differenceInDays(event.end, start) + 1

				const toNextWeek = isAfter(event.end, weekEnd)
				if ( toNextWeek ) {
					eventLength = differenceInDays(weekEnd, clamp(event.start, {start: weekStart, end: weekEnd})) + 1
				}

				const startsToday = isSameDay(start, today)
				let index = i
				let noSlotFree = false

				slots = slots.map(slot => {
					// if event ended, clear the slot
					if ( isBefore(slot.end, today) ) {
						return EMPTY_SLOT
					}
					return slot
				})

				// take a look at first free slot
				// if no free slot is found, place text "n more..." after last slot
				if ( startsToday ) {
					const firstFree = slots.findIndex(e => e.event_id === EMPTY_SLOT.event_id)
					if ( firstFree !== -1 ) {
						index = firstFree
						slots[firstFree] = event

					} else {
						noSlotFree = true
						index = MAX_EVENTS
					}
				}

				const topSpace = index * MULTI_DAY_EVENT_HEIGHT + MONTH_NUMBER_SIZE + 2

				if ( noSlotFree && startsToday && !moreRendered.current ) {
					moreRendered.current = true
					return <Typography
						key={event.title}
						width="100%"
						sx={{
							position: "absolute",
							zIndex: 1,
							textOverflow: "ellipsis",
							cursor: "pointer",
							"&:hover": {
								opacity: 0.7,
								textDecoration: "underline",
							},
						}}
						style={{top: topSpace, fontSize: 11}}
						onClick={(e) => {
							e.stopPropagation()
							onViewMore(event.start)
						}}
					>
						{Math.abs(todayEvents.length - MAX_EVENTS)}&nbsp;
						{localizationTexts?.more ?? "More..."}
					</Typography>
				}

				if ( noSlotFree && startsToday && moreRendered.current ) {
					return <React.Fragment key={event.title}/>
				}

				if ( startsToday ) {
					return (
						<EventItem
							key={event.title}
							sx={{
								top: `${topSpace}px`,
								width: `${100 * eventLength}%`,
								position: "absolute",
								zIndex: 1,
								textOverflow: "ellipsis",
							}}
							event={event}
							showdate={false}
							multiday={differenceInDays(event.end, event.start) > 0}
							hasPrev={fromPrevWeek}
							hasNext={toNextWeek}
						/>
					)
				} else {
					return <React.Fragment key={event.title}/>
				}

			})}
		</Fragment>
	)
}

export default MonthEvents
