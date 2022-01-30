import { differenceInMinutes, set } from "date-fns"
import React, { Fragment, memo } from "react"
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

const TodayEvents = memo(({
	todayEvents,
	today,
	startHour,
	step,
	minuteHeight,
	direction,
}: TodayEventsProps) => {
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
				const event_index = crossingEvents.findIndex(e => event.event_id === e.event_id)

				return (
					<EventItem
						key={event.event_id}
						sx={{
							position: "absolute",
							zIndex: 1,
							height,
							top,
							width: crossingEvents.length
								? `calc(${100 / (crossingEvents.length)}% - 5%)`
								: "95%", //Leave some space to click cell
							[direction === "rtl" ? "right" : "left"]:
								event_index > 0
									? `calc(100%/${crossingEvents.length}*${event_index})`
									: "",
						}}
						event={event}/>
				)
			})}
		</Fragment>
	)
})

export default TodayEvents
