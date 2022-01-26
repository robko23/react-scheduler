import { SelectedRange } from "../context/state/stateContext";
import { FieldInputProps, InputTypes, ProcessedEvent } from "../types";
export declare type StateItem = {
    value: any;
    validity: boolean;
    type: InputTypes;
    config?: FieldInputProps;
};
export declare type StateEvent = (ProcessedEvent & SelectedRange) | Record<string, any>;
declare const Editor: () => JSX.Element;
export default Editor;
