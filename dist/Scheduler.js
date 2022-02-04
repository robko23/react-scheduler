import { jsx as _jsx } from "react/jsx-runtime";
import { AppState } from "./context/state/State";
import { defaultProps } from "./context/state/stateContext";
import { SchedulerComponent } from "./SchedulerComponent";
const Scheduler = (props) => {
    return (_jsx(AppState, Object.assign({ passedProps: props }, { children: _jsx(SchedulerComponent, {}, void 0) }), void 0));
};
Scheduler.defaultProps = defaultProps;
export { Scheduler };
