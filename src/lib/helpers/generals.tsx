import { addMinutes, isWithinInterval } from "date-fns"
import { View } from "../components/nav/Navigation"
import { CalendarEvent, SchedulerProps, } from "../types"
import { DayProps } from "../views/Day"
import { MonthProps } from "../views/Month"
import { WeekProps } from "../views/Week"


export const getOneView = (state: Partial<SchedulerProps>): View => {
	if ( state.month ) {
		return "month"
	} else if ( state.week ) {
		return "week"
	} else if ( state.day ) {
		return "day"
	}
	throw new Error("No views were selected")
}

export const getAvailableViews = (month?: MonthProps, week?: WeekProps, day?: DayProps) => {
	let views: View[] = []
	if ( month ) {
		views.push("month")
	}
	if ( week ) {
		views.push("week")
	}
	if ( day ) {
		views.push("day")
	}
	return views
}

export const traversCrossingEvents = (
	todayEvents: CalendarEvent[],
	event: CalendarEvent
): CalendarEvent[] => {
	return todayEvents.filter(
		(e) =>
			// e.event_id !== event.event_id &&
			(isWithinInterval(addMinutes(event.start, 1), {
					start: e.start,
					end: e.end,
				}) ||
				isWithinInterval(addMinutes(event.end, -1), {
					start: e.start,
					end: e.end,
				}) ||
				isWithinInterval(addMinutes(e.start, 1), {
					start: event.start,
					end: event.end,
				}) ||
				isWithinInterval(addMinutes(e.end, -1), {
					start: event.start,
					end: event.end,
				}))
	)
}

export const calcMinuteHeight = (cellHeight: number, step: number) => {
	return Math.ceil(cellHeight) / step
}
export const calcCellHeight = (tableHeight: number, hoursLength: number) => {
	return Math.max(tableHeight / hoursLength, 60)
}
