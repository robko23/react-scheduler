import { ProcessedEvent } from "../../types";
import { WeekCellProps } from "./EmptyCell";
export declare type RowProps = Omit<WeekCellProps & {
    hourIndex: number;
    daysList: Date[];
    step: number;
    resourcedEvents: ProcessedEvent[];
    hour: Date;
    startHour: number;
}, 'start' | 'end' | 'day'>;
export declare const Row: (props: RowProps) => JSX.Element;
