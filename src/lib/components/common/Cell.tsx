import { alpha, Button, useTheme } from "@mui/material"
import { addMinutes, differenceInMinutes, isEqual } from "date-fns"
import React, { ForwardedRef, forwardRef, memo } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { CalendarEvent } from "../../types"

interface CellProps {
	start: Date;
	end: Date;
	children?: JSX.Element;
	onCellClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Cell = memo(((props: CellProps) => {
	const {onEventDrop, events} = useCalendarProps()
	const theme = useTheme()

	const onDrop = (
		eventId: string,
		startTime: Date
	) => {
		if ( !events ) {
			return
		}
		// Get dropped event
		const droppedEvent = events.find((e) => {
			if ( typeof e.id === "number" ) {
				return e.id === +eventId
			}
			return e.id === eventId
		}) as CalendarEvent

		// Omit if dropped on same time slot for non multiple events
		if ( isEqual(droppedEvent.start, startTime) ) {
			return
		}

		// Update event time according to original duration & update resources/owners
		const diff = differenceInMinutes(droppedEvent.end, droppedEvent.start)
		const updatedEvent: CalendarEvent = {
			...droppedEvent,
			start: startTime,
			end: addMinutes(startTime, diff),
		}

		onEventDrop?.(startTime, updatedEvent, droppedEvent)
	}

	return (
		<Button
			fullWidth
			onClick={props.onCellClick}
			onDragOver={(e) => {
				e.currentTarget.style.backgroundColor = alpha(
					theme.palette.secondary.main,
					0.3
				)
				e.preventDefault()
			}}
			onDragEnter={(e) => {
				e.currentTarget.style.backgroundColor = alpha(
					theme.palette.secondary.main,
					0.3
				)
			}}
			onDragLeave={(e) => {
				e.currentTarget.style.backgroundColor = ""
			}}
			onDrop={(e) => {
				e.currentTarget.style.backgroundColor = ""
				const eventId = e.dataTransfer.getData("text")
				onDrop(eventId, props.start)
			}}
		>
			{props.children}
		</Button>
	)
}))

export { Cell }
