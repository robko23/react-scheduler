import React from "react";
import { CellRenderedProps, DayHours } from "../types";
import { WeekDays } from "./Month";
export interface WeekProps {
    weekDays: WeekDays[];
    weekStartOn: WeekDays;
    startHour: DayHours;
    endHour: DayHours;
    step: number;
    cellRenderer?(props: CellRenderedProps): JSX.Element;
}
declare const Week: React.MemoExoticComponent<() => JSX.Element>;
export { Week };
