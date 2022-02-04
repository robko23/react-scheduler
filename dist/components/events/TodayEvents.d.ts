import React from "react";
import { CalendarEvent } from "../../types";
interface TodayEventsProps {
    todayEvents: CalendarEvent[];
    today: Date;
    startHour: number;
    step: number;
    minuteHeight: number;
    direction: "rtl" | "ltr";
}
declare const TodayEvents: React.MemoExoticComponent<({ todayEvents, today, startHour, step, minuteHeight, direction, }: TodayEventsProps) => JSX.Element>;
export default TodayEvents;
