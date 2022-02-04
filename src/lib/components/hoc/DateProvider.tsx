import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import React from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"

interface AuxProps {
	children: React.ReactChild | React.ReactChildren;
}

const DateProvider = ({children}: AuxProps) => {
	const {locale} = useCalendarProps()
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
			{children}
		</LocalizationProvider>
	)
}

export default DateProvider
