import { Paper } from "@mui/material"
import {
	addDays,
	clamp,
	differenceInDays,
	eachMinuteOfInterval,
	endOfDay,
	isAfter,
	isBefore,
	isSameDay,
	isToday,
	isWithinInterval,
	setHours,
	setMinutes,
	startOfDay,
	startOfWeek,
} from "date-fns"
import React, { useCallback } from "react"
import TodayTypo from "../components/common/TodayTypo"
import EventItem from "../components/events/EventItem"
import { RowWithTime } from "../components/week/RowWithTime"
import { MULTI_DAY_EVENT_HEIGHT } from "../helpers/constants"
import { useAppState } from "../hooks/useAppState"
import { GridCell, GridHeaderCell, TableGrid } from "../styles/styles"
import { CellRenderedProps, DayHours, ProcessedEvent, } from "../types"
import { WeekDays } from "./Month"

export interface WeekProps {
	weekDays: WeekDays[];
	weekStartOn: WeekDays;
	startHour: DayHours;
	endHour: DayHours;
	step: number;

	cellRenderer?(props: CellRenderedProps): JSX.Element;
}

// size of one multiday event
const MULTI_SPACE = MULTI_DAY_EVENT_HEIGHT

const Week = React.memo(() => {
	const {
		week,
		selectedDate,
		events,
		handleGotoDay,
	} = useAppState()

	const {weekStartOn, weekDays, startHour, endHour, step, cellRenderer} = week!

	//actual start of week
	const weekStart = startOfWeek(selectedDate, {weekStartsOn: weekStartOn})
	// visible days
	const daysList = weekDays.map((d) => addDays(weekStart, d))
	// visible first day
	const visibleWeekStart = startOfDay(daysList[0])
	// visible last day
	const visibleWeekEnd = endOfDay(daysList[daysList.length - 1])
	// configured start hour
	const START_TIME = setMinutes(setHours(selectedDate, startHour), 0)
	// configured end hour
	const END_TIME = setMinutes(setHours(selectedDate, endHour), 0)
	// calculated intervals
	const hours = eachMinuteOfInterval(
		{
			start: START_TIME,
			end: END_TIME,
		},
		{step: step}
	)


	// renders all events in current week in first visible day
	const renderMultiDayEvents = useCallback((events: ProcessedEvent[]) => {
		return events.map((event, index) => {
			// if event is longer than visible range
			const hasPrev = isBefore(startOfDay(event.start), visibleWeekStart)
			const hasNext = isAfter(endOfDay(event.end), visibleWeekEnd)
			const eventLength =
				differenceInDays(
					hasNext ? visibleWeekEnd : event.end,
					hasPrev ? visibleWeekStart : event.start
				) + 1

			// calculate difference from week start and event start
			const eventStartOffset = differenceInDays(
				clamp(event.start, {start: visibleWeekStart, end: visibleWeekEnd}),
				visibleWeekStart
			)

			return (
				<Paper
					key={event.event_id}
					className="rs__multi_day"
					elevation={2}
					sx={{
						top: index * MULTI_SPACE + 45,
						width: `${100 * eventLength}%`,
						left: `${100 * eventStartOffset}%`
					}}
				>
					<EventItem
						event={event}
						hasPrev={hasPrev}
						hasNext={hasNext}
						multiday
					/>
				</Paper>
			)
		})
	}, [visibleWeekEnd, visibleWeekStart])

	const renderTable = useCallback(() => {
		// all events in current week
		const allWeekMulti = events.filter(
			(e) =>
				differenceInDays(e.end, e.start) > 0 &&
				daysList.some((weekday) =>
					isWithinInterval(weekday, {
						start: startOfDay(e.start),
						end: endOfDay(e.end),
					})
				)
		)

		// Equalizing multi-day section height
		const headerHeight = MULTI_SPACE * allWeekMulti.length + 45
		return (
			<TableGrid days={daysList.length}>

				{/*Empty Cell*/}
				<GridCell/>

				{/* Header days */}
				{daysList.map((date) => (
					<GridHeaderCell
						today={isToday(date)}
						key={date.toISOString()}
						sx={{height: headerHeight}}>
						<TodayTypo date={date} onClick={handleGotoDay}/>
						{isSameDay(visibleWeekStart, date) && renderMultiDayEvents(allWeekMulti)}
					</GridHeaderCell>
				))}

				{/* Time Cells */}
				<RowWithTime
					daysList={daysList}
					hours={hours}
					resourcedEvents={events}
					startHour={startHour}
					step={step}
					cellRenderer={cellRenderer}
				/>
			</TableGrid>
		)
	}, [cellRenderer, daysList, events, handleGotoDay, hours, renderMultiDayEvents, startHour, step, visibleWeekStart])

	return renderTable()
})

export { Week }
