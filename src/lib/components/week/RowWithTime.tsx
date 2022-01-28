import { Typography } from "@mui/material"
import { format } from "date-fns"
import { Fragment, memo } from "react"
import { useAppState } from "../../hooks/useAppState"
import { GridTimeCell } from "../../styles/styles"
import { Row, RowProps } from "./Row"
import React from "react"

type Props = Omit<RowProps & {
	hours: Date[],
}, 'hour' | 'hourIndex'>

export const RowWithTime = memo((props: Props) => {
	const {locale} = useAppState()
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