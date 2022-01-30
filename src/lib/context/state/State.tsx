import { addMinutes, differenceInMinutes, isEqual } from "date-fns"
import React, { ReactChild, useCallback, useEffect, useReducer } from "react"
import { getAvailableViews, getOneView, } from "../../helpers/generals"
import { objectDifference } from "../../helpers/object"
import { EventActions, ProcessedEvent, SchedulerProps } from "../../types"
import { defaultProps, SchedulerState, SelectedRange, StateContext, } from "./stateContext"
import { stateReducer } from "./stateReducer"

interface AppProps {
	children: ReactChild;
	passedProps: Partial<SchedulerProps>;
}

const propsDiff = (state: SchedulerState, updatedProps: Partial<SchedulerProps>): Partial<SchedulerProps> => {
	const extractedProps: Partial<SchedulerProps> = {}
	Object.keys(updatedProps).map((untyped_key) => {
		const key = untyped_key as keyof SchedulerProps
		// @ts-ignore
		extractedProps[key] = updatedProps[key]
	})
	return objectDifference(extractedProps, updatedProps, [ 'sx', 'selectedDate' ])
}

const initialState = (initial: Partial<SchedulerProps>): SchedulerState => {
	const initialView =
		initial.view && initial[initial.view] ? initial.view : getOneView(initial)
	return {
		...initial,
		view: initialView,
		dialog: false,
		mounted: false,
		selectedRange: undefined,
		fields: [ ...defaultProps.fields, ...(initial.fields || []) ],
	} as SchedulerState
}

const AppState = ({passedProps, children}: AppProps) => {
	const [ state, dispatch ] = useReducer(stateReducer, initialState(passedProps))

	const handleState = useCallback((
		value: SchedulerState[keyof SchedulerState],
		name: keyof SchedulerState
	) => {
		dispatch({type: "set", payload: {name, value}})
	}, [ dispatch ])

	const updateProps = useCallback((updatedProps: Partial<SchedulerProps>) => {
		dispatch({type: "updateProps", payload: updatedProps})
	}, [ dispatch ])

	useEffect(() => {
		if ( state.mounted ) {
			updateProps(propsDiff(state, passedProps))
		} else {
			handleState(true, "mounted")
		}
	}, [ passedProps ])

	useEffect(() => {
		passedProps.onDateChange?.(state.selectedDate)
	}, [ state.selectedDate, passedProps.onDateChange ])

	const confirmEvent = (event: ProcessedEvent, action: EventActions) => {
		let updatedEvents: ProcessedEvent[]
		if ( action === "edit" ) {
			updatedEvents = state.events.map((e) =>
				e.event_id === event.event_id ? event : e
			)
		} else {
			updatedEvents = [ ...state.events, event ]
		}
		handleState(updatedEvents, "events")
	}

	const getViews = () => getAvailableViews(state)

	const triggerDialog = (
		status: boolean | undefined,
		selected: SelectedRange | ProcessedEvent
	) => {
		dispatch({type: "triggerDialog", payload: {status, selected}})

	}
	const triggerLoading = (status: boolean) => {
		// Trigger if not out-sourced by props
		if ( typeof passedProps.loading === "undefined" ) {
			dispatch({type: "triggerLoading", payload: status})
		}
	}

	const handleGotoDay = (day: Date) => {
		const views = getViews()
		if ( views.includes("day") ) {
			handleState("day", "view")
			handleState(day, "selectedDate")
		} else if ( views.includes("week") ) {
			handleState("week", "view")
			handleState(day, "selectedDate")
		} else {
			console.warn("No Day/Week views available")
		}
	}

	const onDrop = async (
		eventId: string,
		startTime: Date
	) => {
		// Get dropped event
		const droppedEvent = state.events.find((e) => {
			if ( typeof e.event_id === "number" ) {
				return e.event_id === +eventId
			}
			return e.event_id === eventId
		}) as ProcessedEvent

		// Omit if dropped on same time slot for non multiple events
		if ( isEqual(droppedEvent.start, startTime) ) {
			return
		}

		// Update event time according to original duration & update resources/owners
		const diff = differenceInMinutes(droppedEvent.end, droppedEvent.start)
		const updatedEvent: ProcessedEvent = {
			...droppedEvent,
			start: startTime,
			end: addMinutes(startTime, diff),
		}

		if ( passedProps.onEventDrop ) {
			return passedProps.onEventDrop(startTime, updatedEvent, droppedEvent)
		} else {
			confirmEvent(updatedEvent, "edit")
		}
	}

	return (
		<StateContext.Provider
			value={{
				...state,
				handleState,
				getViews,
				triggerDialog,
				triggerLoading,
				handleGotoDay,
				confirmEvent,
				onDrop,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

export { AppState }
