import { SxProps, Theme } from "@mui/material";
import { ReactElement } from "react";
import { ProcessedEvent } from "../../types";
interface EventItemProps {
    event: ProcessedEvent;
    multiday: boolean;
    hasPrev?: boolean;
    hasNext?: boolean;
    showdate?: boolean;
    sx?: SxProps<Theme>;
}
declare const EventItem: {
    ({ event, multiday, hasPrev, hasNext, showdate, sx }: EventItemProps): ReactElement<EventItemProps>;
    defaultProps: {
        multiday: boolean;
        showdate: boolean;
    };
};
export default EventItem;
