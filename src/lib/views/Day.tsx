import { Box } from "@mui/material"
import {
	differenceInDays,
	eachMinuteOfInterval,
	endOfDay,
	isAfter,
	isBefore,
	isWithinInterval,
	setHours,
	setMinutes,
	startOfDay,
} from "date-fns"
import React from "react"
import TodayTypo from "../components/common/TodayTypo"
import EventItem from "../components/events/EventItem"
import { RowsWithTime } from "../components/week/RowsWithTime"
import { MULTI_DAY_EVENT_HEIGHT } from "../helpers/constants"
import { useAppState } from "../hooks/useAppState"
import { GridCell, GridHeaderCell, TableGrid } from "../styles/styles"
import { CellRenderedProps, DayHours, ProcessedEvent, } from "../types"

export interface DayProps {
	startHour: DayHours;
	endHour: DayHours;
	step: number;

	cellRenderer?(props: CellRenderedProps): JSX.Element;
}

const Day = () => {
	const {
		day,
		selectedDate,
		events,
	} = useAppState()
	const {startHour, endHour, step} = day!
	const START_TIME = setMinutes(setHours(selectedDate, startHour), 0)
	const END_TIME = setMinutes(setHours(selectedDate, endHour), 0)
	const hours = eachMinuteOfInterval(
		{
			start: START_TIME,
			end: END_TIME,
		},
		{step: step}
	)


	const todayEvents = events.sort((b, a) => a.end.getTime() - b.end.getTime())

	const renderMultiDayEvents = (events: ProcessedEvent[]) => {
		const multiDays = events.filter(
			(e) =>
				differenceInDays(e.end, e.start) > 0 &&
				isWithinInterval(selectedDate, {
					start: startOfDay(e.start),
					end: endOfDay(e.end),
				})
		)

		return (
			<Box
				// className="rs__block_col"
				sx={{
					height: MULTI_DAY_EVENT_HEIGHT * multiDays.length,
					position: 'relative'
				}}
			>
				{multiDays.map((event, i) => {
					const hasPrev = isBefore(event.start, startOfDay(selectedDate))
					const hasNext = isAfter(event.end, endOfDay(selectedDate))
					return (
						<EventItem
							event={event}
							multiday
							hasPrev={hasPrev}
							hasNext={hasNext}
							key={event.event_id}
							sx={{
								position: "absolute",
								zIndex: 1,
								textOverflow: "ellipsis",
								top: `${i * MULTI_DAY_EVENT_HEIGHT}px`,
								width: "100%",
							}}
						/>
					)
				})}
			</Box>
		)
	}

	const renderTable = () => {

		const allWeekMulti = events.filter(
			(e) =>
				differenceInDays(e.end, e.start) > 0 &&
				isWithinInterval(selectedDate, {
					start: startOfDay(e.start),
					end: endOfDay(e.end),
				})
		)
		// Equalizing multi-day section height
		const headerHeight = MULTI_DAY_EVENT_HEIGHT * allWeekMulti.length + 45
		return (
			<TableGrid days={1}>
				{/* Header */}
				<GridCell/>
				<GridHeaderCell
					sx={{height: `${headerHeight}px`}}>
					<TodayTypo date={selectedDate}/>
					{renderMultiDayEvents(todayEvents)}
				</GridHeaderCell>

				<RowsWithTime daysList={[ selectedDate ]} step={step} events={todayEvents}
							  startHour={startHour} hours={hours}/>
			</TableGrid>
		)
	}

	return renderTable()

}

export { Day }
