import { ProcessedEvent } from "../../types";
interface MonthEventProps {
    events: ProcessedEvent[];
    today: Date;
    daysList: Date[];
    weekStart: Date;
    weekEnd: Date;
    onViewMore(day: Date): void;
    cellSize: number;
}
declare const MonthEvents: ({ events, today, onViewMore, weekEnd, weekStart, cellSize }: MonthEventProps) => JSX.Element;
export default MonthEvents;
