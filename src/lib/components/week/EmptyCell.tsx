import { ForwardedRef, forwardRef } from "react"
import { useAppState } from "../../hooks/useAppState"
import { CellRenderedProps } from "../../types"
import { Cell } from "../common/Cell"

export type WeekCellProps = {
	cellRenderer?(props: CellRenderedProps): JSX.Element;
	day: Date,
	start: Date,
	end: Date
}

export const EmptyCell = forwardRef((props: WeekCellProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {triggerDialog} = useAppState()
	if ( props.cellRenderer ) {
		return props.cellRenderer({
			day: props.day,
			start: props.start,
			end: props.end,
			ref: ref,
			onClick: () =>
				triggerDialog(true, {
					start: props.start,
					end: props.end,
				}),
		})
	}

	return <Cell
		start={props.start}
		end={props.end}
		ref={ref}
	/>
})