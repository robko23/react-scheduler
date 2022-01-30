import { addMinutes, isWithinInterval } from "date-fns"
import { View } from "../components/nav/Navigation"
import { FieldProps, ProcessedEvent, SchedulerProps, } from "../types"
import { StateEvent } from "../views/Editor"

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

export const getAvailableViews = (state: SchedulerProps) => {
	let views: View[] = []
	if ( state.month ) {
		views.push("month")
	}
	if ( state.week ) {
		views.push("week")
	}
	if ( state.day ) {
		views.push("day")
	}
	return views
}

export const arraytizeFieldVal = (
	field: FieldProps,
	val: any,
	event?: StateEvent
) => {
	const arrytize =
		field.config?.multiple &&
		!Array.isArray(event?.[field.name] || field.default)
	const value = arrytize ? (val ? [ val ] : []) : val
	const validity = arrytize ? value.length : value
	return {value, validity}
}

export const traversCrossingEvents = (
	todayEvents: ProcessedEvent[],
	event: ProcessedEvent
): ProcessedEvent[] => {
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
