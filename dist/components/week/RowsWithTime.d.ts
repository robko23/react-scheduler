import React from "react";
import { RowProps } from "./Row";
declare type Props = Omit<RowProps & {
    hours: Date[];
}, 'hour' | 'hourIndex'>;
export declare const RowsWithTime: React.MemoExoticComponent<(props: Props) => JSX.Element>;
export {};
