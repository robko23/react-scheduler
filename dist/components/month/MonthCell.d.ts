/// <reference types="react" />
import { CellRenderedProps } from "../../types";
import { WeekDays } from "../../views/Month";
declare type MonthCellProps = {
    cellRenderer?(props: CellRenderedProps): JSX.Element;
    daysList: Date[];
    monthStart: Date;
    end: Date;
    start: Date;
    day: WeekDays;
    startDay: Date;
    endDay: Date;
    weekDays: WeekDays[];
    today: Date;
};
export declare const MonthCell: ({ cellRenderer, daysList, monthStart, end, start, day, endDay, startDay, today, weekDays }: MonthCellProps) => JSX.Element;
export {};
