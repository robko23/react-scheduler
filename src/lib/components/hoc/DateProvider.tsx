import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { useAppState } from "../../hooks/useAppState"

interface AuxProps {
	children: React.ReactChild | React.ReactChildren;
}

const DateProvider = ({children}: AuxProps) => {
	const {locale} = useAppState()
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
			{children}
		</LocalizationProvider>
	)
}

export default DateProvider
