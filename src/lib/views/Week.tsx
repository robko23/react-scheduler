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
import React, { useCallback, useMemo } from "react"
import TodayTypo from "../components/common/TodayTypo"
import EventItem from "../components/events/EventItem"
import { RowsWithTime } from "../components/week/RowsWithTime"
import { MULTI_DAY_EVENT_HEIGHT, TODAY } from "../helpers/constants"
import { useCalendarProps } from "../hooks/useCalendarProps"
import { GridCell, GridHeaderCell, TableGrid } from "../styles/styles"
import { CalendarEvent, CellRenderedProps, DayHours, } from "../types"
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

const Week = () => {
	const {
		week,
		selectedDate = TODAY,
		events = [],
		onViewChange,
		onDateChange
	} = useCalendarProps()

	const {weekStartOn, weekDays, startHour, endHour, step, cellRenderer} = week!

	//actual start of week
	const weekStart = useMemo(
		() => startOfWeek(selectedDate, {weekStartsOn: weekStartOn}), [ selectedDate, weekStartOn ])
	// visible days
	const daysList = useMemo(() => weekDays.map((d) => addDays(weekStart, d)), [ weekStart ])
	// visible first day
	const visibleWeekStart = useMemo(() => startOfDay(daysList[0]), [ daysList ])
	// visible last day
	const visibleWeekEnd = useMemo(() => endOfDay(daysList[daysList.length - 1]), [ daysList ])
	// configured start hour
	const START_TIME = useMemo(() => setMinutes(setHours(selectedDate, startHour), 0), [ selectedDate, startHour ])
	// configured end hour
	const END_TIME = useMemo(() => setMinutes(setHours(selectedDate, endHour), 0), [selectedDate, endHour])
	// calculated intervals
	const hours = useMemo(() => eachMinuteOfInterval(
		{
			start: START_TIME,
			end: END_TIME,
		},
		{step}
	), [START_TIME, END_TIME, step])

	const handleGotoDay = (day: Date) => {
		onDateChange?.(day)
		onViewChange?.('day')
	}


	// renders all events in current week in first visible day
	const renderMultiDayEvents = useCallback((events: CalendarEvent[]) => {
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
				<EventItem
					key={event.id}
					event={event}
					hasPrev={hasPrev}
					hasNext={hasNext}
					multiday
					sx={{
						top: index * MULTI_SPACE + 45,
						width: `${100 * eventLength}%`,
						left: `${100 * eventStartOffset}%`,
						position: "absolute",
						zIndex: 1,
						textOverflow: "ellipsis",
					}}
				/>
			)
		})
	}, [ visibleWeekEnd, visibleWeekStart ])


	const renderTable = () => {
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
				<RowsWithTime
					daysList={daysList}
					hours={hours}
					startHour={startHour}
					step={step}
					cellRenderer={cellRenderer}
				/>
			</TableGrid>
		)
	}

	return renderTable()
}

export { Week }
