import React, { ForwardedRef } from "react";
interface CellProps {
    start: Date;
    end: Date;
    children?: JSX.Element;
}
export declare type OnCellClickProps = {
    ref: ForwardedRef<HTMLButtonElement>;
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};
declare const Cell: React.ForwardRefExoticComponent<CellProps & React.RefAttributes<HTMLButtonElement>>;
export { Cell };
