import { ReactChild } from "react";
import { SchedulerProps } from "../../types";
interface AppProps {
    children: ReactChild;
    initial: Partial<SchedulerProps>;
}
declare const AppState: ({ initial, children }: AppProps) => JSX.Element;
export { AppState };
