import { Avatar, Typography, useTheme } from "@mui/material"
import { styled } from "@mui/material/styles"
import { addDays, endOfDay, format, isSameMonth, isToday } from "date-fns"
import React, { Fragment, useLayoutEffect, useRef, useState } from "react"
import { MONTH_NUMBER_SIZE, TODAY } from "../../helpers/constants"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { useThrottledResizeObserver } from "../../hooks/useThrottledObserver"
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

const MonthCellDayNumber = styled(Avatar, {
	shouldForwardProp: prop => prop !== 'today'
})<{today: boolean}>(({theme, today}) => ({
	width: MONTH_NUMBER_SIZE,
	height: MONTH_NUMBER_SIZE,
	position: "absolute",
	top: 0,
	background: today
		? theme.palette.secondary.main
		: "transparent",
	color: today
		? theme.palette.getContrastText(theme.palette.secondary.main)
		: theme.palette.text.primary,
	marginBottom: 2,
}))

export const MonthCell = ({
	cellRenderer, daysList, monthStart,
	end, start, day, endDay, startDay, today, weekDays
}: MonthCellProps) => {
	const {ref, height = 1} = useThrottledResizeObserver<HTMLButtonElement>(100)
	const {
		events = [],
		selectedDate = TODAY,
		onCellClick,
		onViewChange,
		onDateChange
	} = useCalendarProps()
	const theme = useTheme()

	const handleGotoDay = (day: Date) => {
		onViewChange?.('day')
		onDateChange?.(day)
	}

	return (
		<GridCell
			className="MonthCell"
			ref={ref}
			sx={{
				minHeight: MONTH_NUMBER_SIZE * 2,
			}}
			key={day.toString()}>
			{/*region Cell render*/}
			{cellRenderer ? (
					cellRenderer({
						day: selectedDate,
						start,
						end,
						onClick: (event) =>
							onCellClick?.(start, end, event)
					})
				) :
				(
					<Cell
						start={start}
						end={end}
						onCellClick={e => onCellClick?.(start, end, e)}
					/>
				)
			}
			{/*endregion*/}

			<Fragment>
				<MonthCellDayNumber today={isToday(today)} className='DayNumber'>
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
				</MonthCellDayNumber>

				{height > 1 &&
                <MonthEvents
                    events={events}
                    today={today}
                    daysList={daysList}
                    onViewMore={handleGotoDay}
                    weekStart={addDays(startDay, weekDays[0])}
                    weekEnd={endOfDay(endDay)}
                    cellSize={height}
                />
				}
			</Fragment>
		</GridCell>
	)
}