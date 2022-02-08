import React from "react";
import { WeekCellProps } from "./EmptyCell";
export declare type RowProps = Omit<WeekCellProps & {
    daysList: Date[];
    step: number;
    hour: Date;
}, 'start' | 'end' | 'day'>;
export declare const Row: React.MemoExoticComponent<(props: RowProps) => JSX.Element>;
