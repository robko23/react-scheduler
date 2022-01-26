import { CellRenderedProps } from "../../types";
import React from "react";
export declare type WeekCellProps = {
    cellRenderer?(props: CellRenderedProps): JSX.Element;
    day: Date;
    start: Date;
    end: Date;
};
export declare const EmptyCell: React.ForwardRefExoticComponent<WeekCellProps & React.RefAttributes<HTMLButtonElement>>;
