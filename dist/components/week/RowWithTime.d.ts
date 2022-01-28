import { RowProps } from "./Row";
import React from "react";
declare type Props = Omit<RowProps & {
    hours: Date[];
}, 'hour' | 'hourIndex'>;
export declare const RowWithTime: React.MemoExoticComponent<(props: Props) => JSX.Element>;
export {};
