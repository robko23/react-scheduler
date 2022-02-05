/// <reference types="react" />
import { SchedulerProps } from "../../types";
export declare const defaultProps: SchedulerProps;
declare const StateContext: import("react").Context<Partial<{
    sx?: import("@mui/system").SxProps<import("@mui/material").Theme> | undefined;
    view: import("../../components/nav/Navigation").View;
    month: import("../../views/Month").MonthProps;
    week: import("../../views/Week").WeekProps;
    day: import("../../views/Day").DayProps;
    selectedDate: Date;
    events: import("../../types").CalendarEvent[];
    loading: boolean;
    direction: "rtl" | "ltr";
    locale: Locale;
    onEventDrop(droppedOn: Date, updatedEvent: import("../../types").CalendarEvent, originalEvent: import("../../types").CalendarEvent): Promise<void | import("../../types").CalendarEvent>;
    onCellClick: (cellStart: Date, cellEnd: Date, event: import("react").MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onEventClick: (calendarEvent: import("../../types").CalendarEvent, event: import("react").MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    localizationTexts: Partial<{
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
    disableDrag: boolean;
    onDateChange: (date: Date) => void;
    onViewChange: (view: import("../../components/nav/Navigation").View) => void;
    renderNavigation: (props: import("../../components/nav/Navigation").RenderNavigationProps) => JSX.Element;
}>>;
export { StateContext };
