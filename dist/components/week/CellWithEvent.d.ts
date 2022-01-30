import React, { ReactElement } from "react";
import { ProcessedEvent } from "../../types";
declare type Props = {
    hour: Date;
    step: number;
    hourIndex: number;
    day: Date;
    startHour: number;
    events: ProcessedEvent[];
};
export declare const CellWithEvent: React.MemoExoticComponent<(props: Props) => ReactElement>;
export {};
