import DatePicker from "@mui/lab/DatePicker"
import { Button } from "@mui/material"
import { addMonths, format, getMonth } from "date-fns"
import React, { useState } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { LocaleArrow } from "../common/LocaleArrow"
import DateProvider from "../hoc/DateProvider"

interface MonthDateBtnProps {
	selectedDate: Date;
}

const MonthDateBtn = ({selectedDate}: MonthDateBtnProps) => {
	const {
		locale,
		localizationTexts,
		onDateChange
	} = useCalendarProps()
	const [ open, setOpen ] = useState(false)

	const toggleDialog = () => setOpen(!open)

	const handleChange = (e: Date | null, k?: string) => {
		if ( e ) {
			onDateChange?.(e)
		}
	}

	const handlePrev = () => {
		const prevMonth = addMonths(selectedDate, -1)
		onDateChange?.(prevMonth)
	}

	const handleNext = () => {
		const nextMonth = addMonths(selectedDate, 1)
		onDateChange?.(nextMonth)
	}

	return (
		<>
			<LocaleArrow type="prev" onClick={handlePrev}
						 tooltip={localizationTexts?.previousMonth ?? 'Previous month'}/>
			<DateProvider>
				<DatePicker
					open={open}
					onClose={toggleDialog}
					openTo="month"
					views={[ "year", "month" ]}
					value={selectedDate}
					onChange={handleChange}
					renderInput={(params) => (
						<Button
							ref={params.inputRef}
							style={{padding: 4}}
							onClick={toggleDialog}
						>
							{format(selectedDate, "MMMM yyyy", {locale: locale})}
						</Button>
					)}
				/>
			</DateProvider>
			<LocaleArrow type="next" onClick={handleNext}
						 tooltip={localizationTexts?.nextMonth ?? 'Next month'}/>
		</>
	)
}

export { MonthDateBtn }
