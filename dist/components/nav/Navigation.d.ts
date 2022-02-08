import React, { ReactNode } from "react";
export declare type View = "month" | "week" | "day";
export declare type RenderNavigationProps = {
    dateSelector: ReactNode;
    todayButton: ReactNode;
    viewSelector: ReactNode;
    isDesktop: boolean;
};
declare const Navigation: React.MemoExoticComponent<() => JSX.Element>;
export { Navigation };
