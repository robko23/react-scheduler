import { ReactElement } from "react";
import { ProcessedEvent } from "../../types";
declare type Props = {
    hour: Date;
    step: number;
    hourIndex: number;
    day: Date;
    startHour: number;
    resourcedEvents: ProcessedEvent[];
};
export declare const CellWithEvent: (props: Props) => ReactElement;
export {};
