import { ReactChild } from "react";
import { SchedulerProps } from "../../types";
interface AppProps {
    children: ReactChild;
    passedProps: Partial<SchedulerProps>;
}
declare const AppState: ({ passedProps, children }: AppProps) => JSX.Element;
export { AppState };
