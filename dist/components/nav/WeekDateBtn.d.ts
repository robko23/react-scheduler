import { WeekProps } from "../../views/Week";
interface WeekDateBtnProps {
    selectedDate: Date;
    weekProps: WeekProps;
}
declare const WeekDateBtn: ({ selectedDate, weekProps, }: WeekDateBtnProps) => JSX.Element;
export { WeekDateBtn };
