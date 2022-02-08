import React, { ReactElement } from "react";
import { CalendarEvent } from "../../types";
export declare type CellWithEventProps = {
    hour: Date;
    step: number;
    day: Date;
    startHour: number;
    events: CalendarEvent[];
};
export declare const CellWithEvent: React.MemoExoticComponent<(props: CellWithEventProps) => ReactElement>;
