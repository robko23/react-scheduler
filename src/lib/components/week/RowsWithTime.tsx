import { Typography } from "@mui/material"
import { format } from "date-fns"
import React, { Fragment, memo } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { GridTimeCell } from "../../styles/styles"
import { EventRow, EventRowProps } from "./EventRow"
import { Row } from "./Row"

type Props = Omit<EventRowProps & {
	hours: Date[],
}, 'hour' | 'hourIndex'>

export const RowsWithTime = memo((props: Props) => {
	const {locale} = useCalendarProps()
	const hours = props.hours.map((hour, hourIndex) => (
		<Fragment key={hour.toISOString()}>
			{/* Time cell */}
			<GridTimeCell>
				<Typography variant="caption">
					{format(hour, "hh:mm a", {locale: locale})}
				</Typography>
			</GridTimeCell>

			{hourIndex === 0 ?
				<EventRow
					hour={hour}
					startHour={props.startHour}
					step={props.step}
					cellRenderer={props.cellRenderer}
					daysList={props.daysList}
					/>
				:
				<Row
					step={props.step}
					cellRenderer={props.cellRenderer}
					daysList={props.daysList}
					hour={hour}
				/>
			}
		</Fragment>
	))

	return <>{hours}</>
})