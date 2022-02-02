import React from "react";
export declare type View = "month" | "week" | "day";
export declare type RenderNavigationProps = {
    dateSelector: JSX.Element;
    todayButton: JSX.Element;
    viewSelector: JSX.Element;
    isDesktop: boolean;
};
declare const Navigation: React.MemoExoticComponent<() => JSX.Element>;
export { Navigation };
