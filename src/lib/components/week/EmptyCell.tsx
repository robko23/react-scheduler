import React, { ForwardedRef, forwardRef, memo } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { CellRenderedProps } from "../../types"
import { Cell } from "../common/Cell"

export type WeekCellProps = {
	cellRenderer?(props: CellRenderedProps): JSX.Element;
	day: Date,
	start: Date,
	end: Date
}

export const EmptyCell = memo(forwardRef((props: WeekCellProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {onCellClick} = useCalendarProps()
	if ( props.cellRenderer ) {
		return props.cellRenderer({
			day: props.day,
			start: props.start,
			end: props.end,
			ref: ref,
			onClick: (event) =>
				onCellClick?.(props.start, props.end, event)
		})
	}

	return <Cell
		start={props.start}
		end={props.end}
		onCellClick={event => onCellClick?.(props.start, props.end, event)}
	/>
}))