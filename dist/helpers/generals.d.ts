import { View } from "../components/nav/Navigation";
import { DefaultRecourse, FieldProps, ProcessedEvent, ResourceFields, SchedulerProps } from "../types";
import { StateEvent } from "../views/Editor";
export declare const getOneView: (state: Partial<SchedulerProps>) => View;
export declare const getAvailableViews: (state: SchedulerProps) => View[];
export declare const arraytizeFieldVal: (field: FieldProps, val: any, event?: StateEvent | undefined) => {
    value: any;
    validity: any;
};
export declare const getResourcedEvents: (events: ProcessedEvent[], resource: DefaultRecourse, resourceFields: ResourceFields, fields: FieldProps[]) => ProcessedEvent[];
export declare const traversCrossingEvents: (todayEvents: ProcessedEvent[], event: ProcessedEvent) => ProcessedEvent[];
export declare const calcMinuteHeight: (cellHeight: number, step: number) => number;
export declare const calcCellHeight: (tableHeight: number, hoursLength: number) => number;
