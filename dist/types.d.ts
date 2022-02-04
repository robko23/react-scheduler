import { SxProps, Theme } from "@mui/material";
import { Locale } from "date-fns";
import React, { ForwardedRef } from "react";
import { RenderNavigationProps, View } from "./components/nav/Navigation";
import { DayProps } from "./views/Day";
import { MonthProps } from "./views/Month";
import { WeekProps } from "./views/Week";
export declare type DayHours = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
export interface CellRenderedProps {
    day: Date;
    start: Date;
    end: Date;
    ref?: ForwardedRef<HTMLButtonElement>;
    onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}
export declare type CalendarEvent = {
    id: number | string;
    title: string;
    start: Date;
    end: Date;
    color?: string;
    disabled?: boolean;
};
export declare type SchedulerProps = Partial<{
    /**
     * Custom styling
     */
    sx?: SxProps<Theme>;
    /** Initial view to load */
    view: View;
    /**Month view settings */
    month: MonthProps;
    /**Week view settings */
    week: WeekProps;
    /**Day view settings */
    day: DayProps;
    /**Initial date selected */
    selectedDate: Date;
    /**Events to display */
    events: CalendarEvent[];
    /**Table loading state */
    loading: boolean;
    /**Direction of table */
    direction: "rtl" | "ltr";
    /**
     * date-fns Locale object
     */
    locale: Locale;
    /**
     * Triggerd when event is dropped on time slot.
     */
    onEventDrop(droppedOn: Date, updatedEvent: CalendarEvent, originalEvent: CalendarEvent): Promise<CalendarEvent | void>;
    /**
     * Fires whenever user clicks on empty cell
     * @param cellStart what is the beginning of the cell
     * @param cellEnd what is the end of the cell
     */
    onCellClick: (cellStart: Date, cellEnd: Date, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onEventClick: (calendarEvent: CalendarEvent, event: React.MouseEvent<HTMLButtonElement>) => void;
    localizationTexts: LocalizationTexts;
    disableDrag: boolean;
    onDateChange: (date: Date) => void;
    onViewChange: (view: View) => void;
    renderNavigation: (props: RenderNavigationProps) => JSX.Element;
}>;
export declare type LocalizationTexts = Partial<{
    today: string;
    day: string;
    week: string;
    month: string;
    previousMonth: string;
    nextMonth: string;
    previousWeek: string;
    nextWeek: string;
    previousDay: string;
    nextDay: string;
    more: string;
    delete: string;
    cancel: string;
}>;
export interface Scheduler extends Partial<SchedulerProps> {
}
