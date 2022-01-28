import React from "react";
interface CellProps {
    start: Date;
    end: Date;
    children?: JSX.Element;
}
declare const Cell: React.ForwardRefExoticComponent<CellProps & React.RefAttributes<HTMLButtonElement>>;
export { Cell };
