import enUS from "date-fns/locale/en-US"
import { createContext } from "react"
import { View } from "../../components/nav/Navigation"
import { EventActions, ProcessedEvent, SchedulerProps, } from "../../types"

export type SelectedRange = { start: Date; end: Date };

export interface SchedulerState extends SchedulerProps {
	mounted: boolean;
	dialog: boolean;
	selectedRange?: SelectedRange;
	selectedEvent?: ProcessedEvent;
}

export interface stateContext extends SchedulerState {
	handleState(
		value: SchedulerState[keyof SchedulerState],
		name: keyof SchedulerState
	): void;

	getViews(): View[];

	triggerDialog(status: boolean, event?: SelectedRange | ProcessedEvent): void;

	triggerLoading(status: boolean): void;

	handleGotoDay(day: Date | string): void;

	confirmEvent(event: ProcessedEvent, action: EventActions): void;

	onDrop(
		eventId: string,
		droppedStartTime: Date,
	): void;
}

export const defaultProps: SchedulerProps = {
	month: {
		weekDays: [ 0, 1, 2, 3, 4, 5 ],
		weekStartOn: 6,
		startHour: 9,
		endHour: 17,
	},
	week: {
		weekDays: [ 0, 1, 2, 3, 4, 5 ],
		weekStartOn: 6,
		startHour: 9,
		endHour: 17,
		step: 60,
	},
	day: {
		startHour: 9,
		endHour: 17,
		step: 60,
	},
	view: "week",
	selectedDate: new Date(),
	events: [],
	fields: [],
	loading: undefined,
	customEditor: undefined,
	onConfirm: undefined,
	onDelete: undefined,
	viewerExtraComponent: undefined,
	direction: "ltr",
	dialogMaxWidth: "md",
	locale: enUS,
}

const StateContext = createContext<stateContext>({
	...defaultProps,
	mounted: false,
	dialog: false,
	selectedRange: undefined,
	selectedEvent: undefined,
	handleState: () => {
	},
	getViews: () => [],
	triggerDialog: () => {
	},
	triggerLoading: () => {
	},
	handleGotoDay: () => {
	},
	confirmEvent: () => {
	},
	onDrop: () => {
	},
})

export { StateContext }
