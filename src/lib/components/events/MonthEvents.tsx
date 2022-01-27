import { Typography } from "@mui/material"
import {
	clamp,
	compareDesc,
	differenceInDays,
	getDate,
	isAfter,
	isBefore,
	isSameDay,
	isWithinInterval,
	set,
} from "date-fns"
import React, { Fragment, useEffect } from "react"
import { END_OF_THE_DAY, MONTH_NUMBER_SIZE, MULTI_DAY_EVENT_HEIGHT, START_OF_THE_DAY, } from "../../helpers/constants"
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

	const MAX_EVENTS = Math.round(
		(cellSize - MONTH_NUMBER_SIZE) / MULTI_DAY_EVENT_HEIGHT - 1
	)

	if(slots.length !== MAX_EVENTS || isSameDay(today, weekStart)) {
		slots = new Array<ProcessedEvent>(MAX_EVENTS).fill(EMPTY_SLOT)
	}

	const todayEvents = events
		.filter((e) =>
			isWithinInterval(today, {
				start: set(e.start, START_OF_THE_DAY),
				end: set(e.end, END_OF_THE_DAY)
			})
		)
		.sort((a, b) => compareDesc(a.end, b.end))

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
					if(isBefore(slot.end, today))
						return EMPTY_SLOT
					return slot
				})

				// take a look at first free slot
				// if no free slot is found, place text "n more..." after last slot
				if(startsToday) {
					const firstFree = slots.findIndex(e => e.event_id === EMPTY_SLOT.event_id)
					if(firstFree !== -1) {
						index = firstFree
						slots[firstFree] = event

					} else {
						noSlotFree = true
						index = MAX_EVENTS
					}
				}

				const topSpace = index * MULTI_DAY_EVENT_HEIGHT + MONTH_NUMBER_SIZE + 2

				if(noSlotFree && startsToday)
					return <Typography
						key={i}
						width="100%"
						className="rs__multi_day rs__hover__op"
						style={{top: topSpace, fontSize: 11}}
						onClick={(e) => {
							e.stopPropagation()
							onViewMore(event.start)
						}}
					>
						{`${Math.abs(todayEvents.length - MAX_EVENTS)} More...`}
					</Typography>

				if ( startsToday ) {
					return (
						<div
							key={event.title}
							className="rs__multi_day"
							style={{
								top: topSpace,
								width: `${100 * eventLength}%`,
							}}
						>
							<EventItem
								event={event}
								showdate={false}
								multiday={differenceInDays(event.end, event.start) > 0}
								hasPrev={fromPrevWeek}
								hasNext={toNextWeek}
							/>
						</div>
					)
				} else {
					return <></>
				}

			})}
		</Fragment>
	)
}

export default MonthEvents
