import { Paper } from "@mui/material"
import {
	addDays,
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
import { useCallback, useEffect } from "react"
import TodayTypo from "../components/common/TodayTypo"
import { WithResources } from "../components/common/WithResources"
import EventItem from "../components/events/EventItem"
import { RowWithTime } from "../components/week/RowWithTime"
import { MULTI_DAY_EVENT_HEIGHT } from "../helpers/constants"
import { getResourcedEvents, } from "../helpers/generals"
import { useAppState } from "../hooks/useAppState"
import { GridCell, GridHeaderCell, TableGrid } from "../styles/styles"
import { CellRenderedProps, DayHours, DefaultRecourse, ProcessedEvent, } from "../types"
import { WeekDays } from "./Month"

export interface WeekProps {
	weekDays: WeekDays[];
	weekStartOn: WeekDays;
	startHour: DayHours;
	endHour: DayHours;
	step: number;

	cellRenderer?(props: CellRenderedProps): JSX.Element;
}

const Week = () => {
	const {
		week,
		selectedDate,
		events,
		handleGotoDay,
		remoteEvents,
		triggerLoading,
		handleState,
		resources,
		resourceFields,
		fields,
	} = useAppState()

	const {weekStartOn, weekDays, startHour, endHour, step, cellRenderer} = week!
	const _weekStart = startOfWeek(selectedDate, {weekStartsOn: weekStartOn})
	const daysList = weekDays.map((d) => addDays(_weekStart, d))
	const weekStart = startOfDay(daysList[0])
	const weekEnd = endOfDay(daysList[daysList.length - 1])
	const START_TIME = setMinutes(setHours(selectedDate, startHour), 0)
	const END_TIME = setMinutes(setHours(selectedDate, endHour), 0)
	const hours = eachMinuteOfInterval(
		{
			start: START_TIME,
			end: END_TIME,
		},
		{step: step}
	)
	// const CELL_HEIGHT = calcCellHeight(height, hours.length)
	// const MINUTE_HEIGHT = calcMinuteHeight(CELL_HEIGHT, step)
	const MULTI_SPACE = MULTI_DAY_EVENT_HEIGHT

	//region Remote events
	const fetchEvents = useCallback(async () => {
		try {
			triggerLoading(true)
			const query = `?start=${weekStart}&end=${weekEnd}`
			const events = await remoteEvents!(query)
			if ( Array.isArray(events) ) {
				handleState(events, "events")
			}
		} catch ( error ) {
			throw error
		} finally {
			triggerLoading(false)
		}
		// eslint-disable-next-line
	}, [ selectedDate ])

	useEffect(() => {
		if ( remoteEvents instanceof Function ) {
			fetchEvents()
		}
		// eslint-disable-next-line
	}, [ fetchEvents ])
	//endregion

	const renderMultiDayEvents = (events: ProcessedEvent[], today: Date) => {
		const isFirstDayInWeek = isSameDay(weekStart, today)
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

		const multiDays = allWeekMulti
			.filter((e) =>
				isBefore(e.start, weekStart)
					? isFirstDayInWeek
					: isSameDay(e.start, today)
			)
			.sort((a, b) => b.end.getTime() - a.end.getTime())
		return multiDays.map((event, i) => {
			const hasPrev = isBefore(startOfDay(event.start), weekStart)
			const hasNext = isAfter(endOfDay(event.end), weekEnd)
			const eventLength =
				differenceInDays(
					hasNext ? weekEnd : event.end,
					hasPrev ? weekStart : event.start
				) + 1
			const prevNextEvents = events.filter((e) =>
				isFirstDayInWeek
					? false
					: e.event_id !== event.event_id && //Exclude it's self
					isWithinInterval(today, {start: e.start, end: e.end})
			)

			let index = i
			if ( prevNextEvents.length ) {
				index += prevNextEvents.length
			}

			return (
				<Paper
					key={event.event_id}
					className="rs__multi_day"
					elevation={2}
					sx={{
						top: index * MULTI_SPACE + 45,
						width: `${100 * eventLength}%`,
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
	}

	const renderTable = (resource?: DefaultRecourse) => {
		let resourcedEvents = events
		if ( resource ) {
			resourcedEvents = getResourcedEvents(
				events,
				resource,
				resourceFields,
				fields
			)
		}

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
				{daysList.map((date, i) => (
					<GridHeaderCell
						today={isToday(date)}
						key={i}
						sx={{height: headerHeight}}>
						<TodayTypo date={date} onClick={handleGotoDay}/>
						{renderMultiDayEvents(resourcedEvents, date)}
					</GridHeaderCell>
				))}

				{/* Time Cells */}
				<RowWithTime
					daysList={daysList}
					hours={hours}
					resourcedEvents={resourcedEvents}
					startHour={startHour}
					step={step}
					cellRenderer={cellRenderer}
				/>
			</TableGrid>
		)
	}

	return resources.length ? (
		<WithResources renderChildren={renderTable}/>) : (renderTable())
}

export { Week }
