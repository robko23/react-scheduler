import { Typography } from "@mui/material"
import { format } from "date-fns"
import React, { Fragment, memo } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { GridTimeCell } from "../../styles/styles"
import { Row, RowProps } from "./Row"

type Props = Omit<RowProps & {
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

			<Row
				{...props}
				hour={hour}
				hourIndex={hourIndex}
			/>
		</Fragment>
	))

	return <>{hours}</>
})