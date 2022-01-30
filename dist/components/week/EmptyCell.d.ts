import React from "react";
import { CellRenderedProps } from "../../types";
export declare type WeekCellProps = {
    cellRenderer?(props: CellRenderedProps): JSX.Element;
    day: Date;
    start: Date;
    end: Date;
};
export declare const EmptyCell: React.MemoExoticComponent<React.ForwardRefExoticComponent<WeekCellProps & React.RefAttributes<HTMLButtonElement>>>;
