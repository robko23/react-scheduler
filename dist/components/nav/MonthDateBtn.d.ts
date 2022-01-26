interface MonthDateBtnProps {
    selectedDate: Date;
    onChange(value: Date, key: "selectedDate"): void;
}
declare const MonthDateBtn: ({ selectedDate, onChange }: MonthDateBtnProps) => JSX.Element;
export { MonthDateBtn };
