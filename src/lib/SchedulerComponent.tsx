import { Box, CircularProgress, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import React, { useMemo } from "react"
import { Navigation } from "./components/nav/Navigation"
import { useAppState } from "./hooks/useAppState"
import { Day } from "./views/Day"
import Editor from "./views/Editor"
import { Month } from "./views/Month"
import { Week } from "./views/Week"

const Calendar = styled(Box, {
	name: 'Calendar',
})(() => ({
	position: "relative",
	display: 'flex',
	flexDirection: 'column'
}))

const LoadingOverlay = styled(Box, {
	name: 'LoadingOverlay',
})(({theme}) => ({
	background: theme.palette.action.disabledBackground,
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	zIndex: 9,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
}))

const Table = styled(Box, {
	name: 'Table'
})(() => ({
	flexGrow: 1,
	width: "100%",
	overflowX: "auto",
	overflowY: "hidden",
}))

const SchedulerComponent = () => {
	const {loading, view, dialog, sx, disableEditor} = useAppState()

	const Views = useMemo(() => {
		switch ( view ) {
			case "month":
				return <Month/>
			case "week":
				return <Week/>
			case "day":
				return <Day/>
			default:
				return ""
		}
	}, [ view ])

	return (
		<Calendar sx={sx}>
			{loading &&
            <LoadingOverlay className='LoadingOverlay'>
                <CircularProgress size={50}/>
                <Typography
                    sx={{pt: 10}}
                    align="center">Loading...</Typography>
			</LoadingOverlay>
			}

			<Navigation/>
			{/*Table*/}
			<Table className='Table'>
				{Views}
			</Table>
			{!disableEditor && dialog && <Editor/>}
		</Calendar>
	)
}

export { SchedulerComponent }
