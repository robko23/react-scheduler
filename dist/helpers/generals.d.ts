import { View } from "../components/nav/Navigation";
import { CalendarEvent, SchedulerProps } from "../types";
export declare const getOneView: (state: Partial<SchedulerProps>) => View;
export declare const getAvailableViews: (state: SchedulerProps) => View[];
export declare const traversCrossingEvents: (todayEvents: CalendarEvent[], event: CalendarEvent) => CalendarEvent[];
export declare const calcMinuteHeight: (cellHeight: number, step: number) => number;
export declare const calcCellHeight: (tableHeight: number, hoursLength: number) => number;
