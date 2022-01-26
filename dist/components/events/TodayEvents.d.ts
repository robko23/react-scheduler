import { ProcessedEvent } from "../../types";
interface TodayEventsProps {
    todayEvents: ProcessedEvent[];
    today: Date;
    startHour: number;
    step: number;
    minuteHeight: number;
    direction: "rtl" | "ltr";
}
declare const TodayEvents: ({ todayEvents, today, startHour, step, minuteHeight, direction, }: TodayEventsProps) => JSX.Element;
export default TodayEvents;
