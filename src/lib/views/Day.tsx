import {
	addDays,
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
		remoteEvents,
		triggerLoading,
		handleState,
		resources,
		resourceFields,
		fields,
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

	//region Remote events
	const fetchEvents = useCallback(async () => {
		try {
			triggerLoading(true)
			const start = addDays(START_TIME, -1)
			const end = addDays(END_TIME, 1)
			const query = `?start=${start}&end=${end}`
			const events = await remoteEvents!(query)
			if ( events && events?.length ) {
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
			<div
				className="rs__block_col"
				style={{height: MULTI_DAY_EVENT_HEIGHT * multiDays.length}}
			>
				{multiDays.map((event, i) => {
					const hasPrev = isBefore(event.start, startOfDay(selectedDate))
					const hasNext = isAfter(event.end, endOfDay(selectedDate))
					return (
						<div
							key={event.event_id}
							className="rs__multi_day"
							style={{
								top: i * MULTI_DAY_EVENT_HEIGHT,
								width: "100%",
							}}
						>
							<EventItem
								event={event}
								multiday
								hasPrev={hasPrev}
								hasNext={hasNext}
							/>
						</div>
					)
				})}
			</div>
		)
	}

	const renderTable = (resource?: DefaultRecourse) => {
		let resourcedEvents = todayEvents
		if ( resource ) {
			resourcedEvents = getResourcedEvents(
				todayEvents,
				resource,
				resourceFields,
				fields
			)
		}

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
					style={{height: headerHeight}}>
					<TodayTypo date={selectedDate}/>
					{renderMultiDayEvents(resourcedEvents)}
				</GridHeaderCell>

				<RowWithTime daysList={[ selectedDate ]} step={step} resourcedEvents={resourcedEvents}
							 startHour={startHour} hours={hours}/>
				{/*/!* Body *!/*/}
				{/*{hours.map((hour, hourIndex) => {*/}
				{/*	const start = new Date(*/}
				{/*		`${format(selectedDate, "yyyy MM dd")} ${format(hour, "hh:mm a")}`*/}
				{/*	)*/}
				{/*	const end = new Date(*/}
				{/*		`${format(selectedDate, "yyyy MM dd")} ${format(*/}
				{/*			addMinutes(hour, step),*/}
				{/*			"hh:mm a"*/}
				{/*		)}`*/}
				{/*	)*/}
				{/*	const field = resourceFields.idField*/}

				{/*	return (*/}
				{/*		<Fragment key={hourIndex}>*/}
				{/*			/!* Time Cells *!/*/}
				{/*			<GridTimeCell>*/}
				{/*				<Typography variant="caption">*/}
				{/*					{format(hour, "hh:mm a", {locale: locale})}*/}
				{/*				</Typography>*/}
				{/*			</GridTimeCell>*/}

				{/*			<CellWithEvent*/}
				{/*				hour={hour}*/}
				{/*				step={step}*/}
				{/*				hourIndex={hourIndex}*/}
				{/*				day={}*/}
				{/*				startHour={startHour}*/}
				{/*				resourcedEvents={recousedEvents}*/}
				{/*			/>*/}
				{/*			/!*<GridCell>*!/*/}
				{/*			/!*	/!* Events of this day - run once on the top hour column *!/*!/*/}
				{/*			/!*	{i === 0 && (*!/*/}
				{/*			/!*		<TodayEvents*!/*/}
				{/*			/!*			todayEvents={recousedEvents.filter(*!/*/}
				{/*			/!*				(e) =>*!/*/}
				{/*			/!*					!differenceInDays(e.end, e.start) &&*!/*/}
				{/*			/!*					isSameDay(selectedDate, e.start)*!/*/}
				{/*			/!*			)}*!/*/}
				{/*			/!*			today={selectedDate}*!/*/}
				{/*			/!*			minuteHeight={MINUTE_HEIGHT}*!/*/}
				{/*			/!*			startHour={startHour}*!/*/}
				{/*			/!*			step={step}*!/*/}
				{/*			/!*			direction={direction}*!/*/}
				{/*			/!*		/>*!/*/}
				{/*			/!*	)}*!/*/}
				{/*			/!*	/!* Cell *!/*!/*/}
				{/*			/!*	{cellRenderer ? (*!/*/}
				{/*			/!*		cellRenderer({*!/*/}
				{/*			/!*			day: selectedDate,*!/*/}
				{/*			/!*			start,*!/*/}
				{/*			/!*			end,*!/*/}
				{/*			/!*			onClick: () =>*!/*/}
				{/*			/!*				triggerDialog(true, {*!/*/}
				{/*			/!*					start,*!/*/}
				{/*			/!*					end,*!/*/}
				{/*			/!*					[field]: resource ? resource[field] : null,*!/*/}
				{/*			/!*				}),*!/*/}
				{/*			/!*			[field]: resource ? resource[field] : null,*!/*/}
				{/*			/!*		})*!/*/}
				{/*			/!*	) : (*!/*/}
				{/*			/!*		<Cell*!/*/}
				{/*			/!*			start={start}*!/*/}
				{/*			/!*			end={end}*!/*/}
				{/*			/!*			resourceKey={field}*!/*/}
				{/*			/!*			resourceVal={resource ? resource[field] : null}*!/*/}
				{/*			/!*		/>*!/*/}
				{/*			/!*	)}*!/*/}
				{/*			/!*</GridCell>*!/*/}
				{/*		</Fragment>*/}
				{/*	)*/}
				{/*})}*/}
			</TableGrid>
		)
	}

	return resources.length ? (
		<WithResources span={2} renderChildren={renderTable}/>
	) : (
		renderTable()
	)
}

export { Day }
