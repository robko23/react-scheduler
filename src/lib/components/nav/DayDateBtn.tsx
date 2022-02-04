import DatePicker from "@mui/lab/DatePicker"
import { Button } from "@mui/material"
import { addDays, format } from "date-fns"
import React, { useState } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { LocaleArrow } from "../common/LocaleArrow"
import DateProvider from "../hoc/DateProvider"

interface DayDateBtnProps {
	selectedDate: Date;
}

const DayDateBtn = ({selectedDate}: DayDateBtnProps) => {
	const {
		locale,
		localizationTexts,
		onDateChange
	} = useCalendarProps()
	const [ open, setOpen ] = useState(false)
	const toggleDialog = () => setOpen(!open)

	const handleChange = (e: Date | null, k?: string) => {
		if(e)
			onDateChange?.(e)
	}

	const handlePrev = () => {
		const prevDay = addDays(selectedDate, -1)
		onDateChange?.(prevDay)
	}

	const handleNext = () => {
		const nexDay = addDays(selectedDate, 1)
		onDateChange?.(nexDay)
	}

	return (
		<>
			<LocaleArrow type="prev" onClick={handlePrev}
						 tooltip={localizationTexts?.previousDay ?? 'Previous day'}/>
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
						>{`${format(selectedDate, "dd, MMMM yyyy", {
							locale: locale,
						})}`}</Button>
					)}
				/>
			</DateProvider>
			<LocaleArrow type="next" onClick={handleNext}
						 tooltip={localizationTexts?.nextDay ?? 'Next day'}/>
		</>
	)
}

export { DayDateBtn }
