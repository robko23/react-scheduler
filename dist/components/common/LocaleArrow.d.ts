import { MouseEvent } from "react";
interface LocaleArrowProps {
    type: "prev" | "next";
    onClick?(e?: MouseEvent): void;
    tooltip: string;
}
declare const LocaleArrow: ({ type, onClick, tooltip }: LocaleArrowProps) => JSX.Element;
export { LocaleArrow };
