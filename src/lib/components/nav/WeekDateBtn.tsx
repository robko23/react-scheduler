import DatePicker from "@mui/lab/DatePicker"
import { Button } from "@mui/material"
import { addDays, addWeeks, endOfWeek, format, startOfWeek } from "date-fns"
import React, { useState } from "react"
import { TODAY } from "../../helpers/constants"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { WeekProps } from "../../views/Week"
import { LocaleArrow } from "../common/LocaleArrow"
import DateProvider from "../hoc/DateProvider"

interface WeekDateBtnProps {
	selectedDate: Date;

	weekProps: WeekProps;
}

const WeekDateBtn = ({
	selectedDate,
	weekProps,
}: WeekDateBtnProps) => {
	const {locale, localizationTexts, onDateChange} = useCalendarProps()
	const [ open, setOpen ] = useState(false)
	const {weekStartOn} = weekProps
	const weekStart = startOfWeek(selectedDate, {weekStartsOn: weekStartOn})
	const weekEnd = endOfWeek(selectedDate, {weekStartsOn: weekStartOn})

	const toggleDialog = () => setOpen(!open)

	const handleChange = (e: Date | null, k?: string) => {
		if(e)
			onDateChange?.(e)
	}

	const handlePrev = () => {
		const lastDayPrevWeek = addDays(weekStart, -1)
		onDateChange?.(lastDayPrevWeek)
	}
	const handleNext = () => {
		const firstDayNextWeek = addDays(weekEnd, 1)
		onDateChange?.(firstDayNextWeek)
	}

	return (
		<>
			<LocaleArrow type="prev" onClick={handlePrev}
						 tooltip={localizationTexts?.previousWeek ?? 'Previous week'}/>
			<DateProvider>
				<DatePicker
					open={open}
					onClose={toggleDialog}
					openTo="day"
					views={[ "month", "day" ]}
					value={selectedDate}
					onChange={handleChange}
					renderInput={(params) => (
						<Button
							ref={params.inputRef}
							style={{padding: 4}}
							onClick={toggleDialog}
						>{`${format(weekStart, "dd", {locale: locale})} - ${format(
							weekEnd,
							"dd MMMM yyyy",
							{
								locale: locale,
							}
						)}`}</Button>
					)}
				/>
			</DateProvider>
			<LocaleArrow type="next" onClick={handleNext}
						 tooltip={localizationTexts?.nextWeek ?? 'Next week'}/>
		</>
	)
}

export { WeekDateBtn }
