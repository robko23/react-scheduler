import { RowProps } from "./Row";
declare type Props = Omit<RowProps & {
    hours: Date[];
}, 'hour' | 'hourIndex'>;
export declare const RowWithTime: (props: Props) => JSX.Element;
export {};
