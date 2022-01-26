import { View } from "../../components/nav/Navigation";
import { DefaultRecourse, EventActions, ProcessedEvent, SchedulerProps } from "../../types";
import React from "react";
export declare type SelectedRange = {
    start: Date;
    end: Date;
};
export interface SchedulerState extends SchedulerProps {
    mounted: boolean;
    dialog: boolean;
    selectedRange?: SelectedRange;
    selectedEvent?: ProcessedEvent;
    selectedResource?: DefaultRecourse["assignee"];
}
export interface stateContext extends SchedulerState {
    handleState(value: SchedulerState[keyof SchedulerState], name: keyof SchedulerState): void;
    getViews(): View[];
    triggerDialog(status: boolean, event?: SelectedRange | ProcessedEvent): void;
    triggerLoading(status: boolean): void;
    handleGotoDay(day: Date | string): void;
    confirmEvent(event: ProcessedEvent, action: EventActions): void;
    onDrop(eventId: string, droppedStartTime: Date, resourceKey?: string, resourceVal?: string | number): void;
}
export declare const defaultProps: SchedulerProps;
declare const StateContext: React.Context<stateContext>;
export { StateContext };
