import { SchedulerState } from "./stateContext";
interface Action {
    type: string;
    payload: any;
}
declare const stateReducer: (state: SchedulerState, action: Action) => SchedulerState;
export { stateReducer };
