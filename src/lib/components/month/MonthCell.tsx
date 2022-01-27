import { Avatar, Typography, useTheme } from "@mui/material"
import { addDays, format, isSameMonth, isToday, set } from "date-fns"
import React, { Fragment, useLayoutEffect, useRef, useState } from "react"
import { END_OF_THE_DAY, MONTH_NUMBER_SIZE } from "../../helpers/constants"
import { useAppState } from "../../hooks/useAppState"
import { GridCell } from "../../styles/styles"
import { CellRenderedProps } from "../../types"
import { WeekDays } from "../../views/Month"
import { Cell } from "../common/Cell"
import MonthEvents from "../events/MonthEvents"

type MonthCellProps = {
	cellRenderer?(props: CellRenderedProps): JSX.Element;
	daysList: Date[],
	monthStart: Date,
	end: Date,
	start: Date,
	day: WeekDays,
	startDay: Date,
	endDay: Date,
	weekDays: WeekDays[],
	today: Date,
}

export const MonthCell = ({
	cellRenderer, daysList, monthStart,
	end, start, day, endDay, startDay, today, weekDays
}: MonthCellProps) => {
	const ref = useRef<HTMLDivElement | null>(null)
	const [ cellSize, setCellSize ] = useState<number | null>(null)
	const {
		events,
		handleGotoDay,
		triggerDialog,
		selectedDate
	} = useAppState()
	const theme = useTheme()

	useLayoutEffect(() => {
		if ( ref.current?.getBoundingClientRect()?.height ) {
			setCellSize(ref.current?.getBoundingClientRect()?.height)
			console.log(ref.current?.getBoundingClientRect()?.height)
		}
	}, [ ref.current ])

	return (
		<GridCell
			ref={ref}
			key={day.toString()}>
			{/*region Cell render*/}
			{cellRenderer ? (
					cellRenderer({
						day: selectedDate,
						start,
						end,
						onClick: () =>
							triggerDialog(true, {
								start,
								end,
							}),
					})
				) :
				(
					<Cell
						start={start}
						end={end}
					/>
				)
			}
			{/*endregion*/}

			<Fragment>
				<Avatar
					sx={{
						width: MONTH_NUMBER_SIZE,
						height: MONTH_NUMBER_SIZE,
						position: "absolute",
						top: 0,
						background: isToday(today)
							? theme.palette.secondary.main
							: "transparent",
						color: isToday(today)
							? theme.palette.getContrastText(theme.palette.secondary.main)
							: theme.palette.text.primary,
						marginBottom: 2,
					}}
				>
					<Typography
						color={
							!isSameMonth(today, monthStart) ? theme.palette.text.disabled : "inherit"
						}
						className="rs__hover__op"
						onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
							e.stopPropagation()
							handleGotoDay(today)
						}}
					>
						{format(today, "dd")}
					</Typography>
				</Avatar>

				{cellSize &&
                <MonthEvents
                    events={events}
                    today={today}
                    daysList={daysList}
                    onViewMore={handleGotoDay}
                    weekStart={addDays(startDay, weekDays[0])}
                    weekEnd={set(endDay, END_OF_THE_DAY)}
                    cellSize={cellSize}
                />
				}
			</Fragment>
		</GridCell>
	)
}