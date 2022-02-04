import React, { ReactElement } from "react";
import { CalendarEvent } from "../../types";
declare type Props = {
    hour: Date;
    step: number;
    hourIndex: number;
    day: Date;
    startHour: number;
    events: CalendarEvent[];
};
export declare const CellWithEvent: React.MemoExoticComponent<(props: Props) => ReactElement>;
export {};
