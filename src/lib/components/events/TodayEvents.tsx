import { Paper } from "@mui/material"
import { differenceInMinutes, set } from "date-fns"
import { Fragment } from "react"
import { BORDER_HEIGHT } from "../../helpers/constants"
import { traversCrossingEvents } from "../../helpers/generals"
import { ProcessedEvent } from "../../types"
import EventItem from "./EventItem"

interface TodayEventsProps {
	todayEvents: ProcessedEvent[];
	today: Date;
	startHour: number;
	step: number;
	minuteHeight: number;
	direction: "rtl" | "ltr";
}

const TodayEvents = ({
	todayEvents,
	today,
	startHour,
	step,
	minuteHeight,
	direction,
}: TodayEventsProps) => {
	const crossingIds: Array<number | string> = []

	return (
		<Fragment>
			{todayEvents.map((event, i) => {
				const height =
					differenceInMinutes(event.end, event.start) * minuteHeight
				const minutesFromTop = differenceInMinutes(
					event.start,
					set(today, {
						hours: startHour,
						minutes: 0,
						seconds: 0
					})
				)
				const topSpace = minutesFromTop * minuteHeight //+ headerHeight;
				/**
				 * Add border height since grid has a 1px border
				 */
				const slotsFromTop = minutesFromTop / step

				const borderFactor = slotsFromTop + BORDER_HEIGHT
				const top = topSpace + borderFactor

				const crossingEvents = traversCrossingEvents(todayEvents, event)
				const alreadyRendered = crossingEvents.filter((e) =>
					crossingIds.includes(e.event_id)
				)
				crossingIds.push(event.event_id)

				return (
					<Paper
						key={event.event_id}
						className="rs__event__item"
						elevation={2}
						sx={{
							height,
							top,
							width: crossingEvents.length
								? `${100 / (crossingEvents.length + 1)}%`
								: "95%", //Leave some space to click cell
							[direction === "rtl" ? "right" : "left"]:
								alreadyRendered.length > 0
									? `calc(100%/${alreadyRendered.length + 1})`
									: "",
						}}
					>
						<EventItem event={event}/>
					</Paper>
				)
			})}
		</Fragment>
	)
}

export default TodayEvents
