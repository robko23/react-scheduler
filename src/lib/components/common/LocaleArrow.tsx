import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded"
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded"
import { IconButton, Tooltip } from "@mui/material"
import { MouseEvent } from "react"
import { useAppState } from "../../hooks/useAppState"

interface LocaleArrowProps {
	type: "prev" | "next";

	onClick?(e?: MouseEvent): void;

	tooltip: string
}

const LocaleArrow = ({type, onClick, tooltip}: LocaleArrowProps) => {
	const {direction} = useAppState()

	let Arrow = NavigateNextRoundedIcon
	if ( type === "prev" ) {
		Arrow =
			direction === "rtl" ? NavigateNextRoundedIcon : NavigateBeforeRoundedIcon
	} else if ( type === "next" ) {
		Arrow =
			direction === "rtl" ? NavigateBeforeRoundedIcon : NavigateNextRoundedIcon
	}

	return (
		<Tooltip title={tooltip} describeChild>
			<IconButton
				style={{padding: 2}}
				onClick={onClick}
				onDragOver={(e) => {
					e.preventDefault()
					if ( onClick ) {
						onClick()
					}
				}}
			>
				<Arrow/>
			</IconButton>
		</Tooltip>
	)
}

export { LocaleArrow }
