import React from "react";
interface CellProps {
    start: Date;
    end: Date;
    children?: JSX.Element;
    onCellClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
declare const Cell: React.MemoExoticComponent<(props: CellProps) => JSX.Element>;
export { Cell };
