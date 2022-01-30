import DatePicker from "@mui/lab/DatePicker"
import { Button } from "@mui/material"
import { format, getMonth, setMonth } from "date-fns"
import React, { useState } from "react"
import { useAppState } from "../../hooks/useAppState"
import { LocaleArrow } from "../common/LocaleArrow"
import DateProvider from "../hoc/DateProvider"

interface MonthDateBtnProps {
	selectedDate: Date;

	onChange(value: Date, key: "selectedDate"): void;
}

const MonthDateBtn = ({selectedDate, onChange}: MonthDateBtnProps) => {
	const {locale, localizationTexts} = useAppState()
	const [ open, setOpen ] = useState(false)
	const currentMonth = getMonth(selectedDate)

	const toggleDialog = () => setOpen(!open)

	const handleChange = (e: Date | null, k?: string) => {
		onChange(e || new Date(), "selectedDate")
	}

	const handlePrev = () => {
		const prevMonth = currentMonth - 1
		onChange(setMonth(selectedDate, prevMonth), "selectedDate")
	}

	const handleNext = () => {
		const nextMonth = currentMonth + 1
		onChange(setMonth(selectedDate, nextMonth), "selectedDate")
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
