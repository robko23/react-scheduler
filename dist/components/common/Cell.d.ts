import React from "react";
interface CellProps {
    start: Date;
    end: Date;
    children?: JSX.Element;
    onCellClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
declare const Cell: ({ start, end, children, onCellClick }: CellProps) => JSX.Element;
export { Cell };
