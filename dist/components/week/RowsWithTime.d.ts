import React from "react";
import { EventRowProps } from "./EventRow";
declare type Props = Omit<EventRowProps & {
    hours: Date[];
}, 'hour' | 'hourIndex'>;
export declare const RowsWithTime: React.MemoExoticComponent<(props: Props) => JSX.Element>;
export {};
