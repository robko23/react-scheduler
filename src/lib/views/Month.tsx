import { Typography } from "@mui/material"
import { addDays, eachWeekOfInterval, endOfMonth, format, startOfMonth, } from "date-fns"
import React from "react"
import { MonthRows } from "../components/month/MonthRows"
import { useAppState } from "../hooks/useAppState"
import { GridHeaderCell, TableGrid } from "../styles/styles"
import { CellRenderedProps, DayHours } from "../types"

export type WeekDays = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface MonthProps {
	weekDays: WeekDays[];
	weekStartOn: WeekDays;
	startHour: DayHours;
	endHour: DayHours;

	cellRenderer?(props: CellRenderedProps): JSX.Element;
}

const Month = () => {
	const {
		month,
		selectedDate,
		locale
	} = useAppState()

	const {weekStartOn, weekDays, startHour, endHour, cellRenderer} = month!
	const monthStart = startOfMonth(selectedDate)
	const monthEnd = endOfMonth(selectedDate)
	const eachWeekStart = eachWeekOfInterval(
		{
			start: monthStart,
			end: monthEnd,
		},
		{weekStartsOn: weekStartOn}
	)

	const daysList = weekDays.map((d) => addDays(eachWeekStart[0], d))

	const renderTable = () => {
		return (
			<TableGrid days={daysList.length} indent="0" className='MonthGrid'>
				{/* Header Days */}
				{daysList.map((date) => (
					<GridHeaderCell key={date.toISOString()} className='MonthHeaderCell'>
						<Typography align="center" variant="h6">
							{format(date, "eee", {locale})}
						</Typography>
					</GridHeaderCell>
				))}

				<MonthRows cellRenderer={cellRenderer}
					eachWeekStart={eachWeekStart} weekDays={weekDays} startHour={startHour} endHour={endHour}
						   daysList={daysList} monthStart={monthStart}/>

			</TableGrid>
		)
	}

	return renderTable()

}

export { Month }
