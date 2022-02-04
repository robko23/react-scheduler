import React from "react";
import { CalendarEvent } from "../../types";
import { WeekCellProps } from "./EmptyCell";
export declare type RowProps = Omit<WeekCellProps & {
    hourIndex: number;
    daysList: Date[];
    step: number;
    events: CalendarEvent[];
    hour: Date;
    startHour: number;
}, 'start' | 'end' | 'day'>;
export declare const Row: React.MemoExoticComponent<(props: RowProps) => JSX.Element>;
