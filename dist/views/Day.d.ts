/// <reference types="react" />
import { CellRenderedProps, DayHours } from "../types";
export interface DayProps {
    startHour: DayHours;
    endHour: DayHours;
    step: number;
    cellRenderer?(props: CellRenderedProps): JSX.Element;
}
declare const Day: () => JSX.Element;
export { Day };
