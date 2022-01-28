import { ProcessedEvent } from "../../types";
import { WeekCellProps } from "./EmptyCell";
import React from "react";
export declare type RowProps = Omit<WeekCellProps & {
    hourIndex: number;
    daysList: Date[];
    step: number;
    resourcedEvents: ProcessedEvent[];
    hour: Date;
    startHour: number;
}, 'start' | 'end' | 'day'>;
export declare const Row: React.MemoExoticComponent<(props: RowProps) => JSX.Element>;
