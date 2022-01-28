/// <reference types="react" />
import { CellRenderedProps, DayHours } from "../../types";
import { WeekDays } from "../../views/Month";
declare type MonthRowProps = {
    eachWeekStart: Date[];
    weekDays: WeekDays[];
    startHour: DayHours;
    endHour: DayHours;
    cellRenderer?(props: CellRenderedProps): JSX.Element;
    daysList: Date[];
    monthStart: Date;
};
export declare const MonthRows: ({ cellRenderer, eachWeekStart, endHour, startHour, weekDays, daysList, monthStart }: MonthRowProps) => JSX.Element;
export {};
