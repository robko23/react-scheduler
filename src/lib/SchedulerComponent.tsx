import { Box, CircularProgress, Typography } from "@mui/material"
import { useMemo } from "react"
import { Navigation } from "./components/nav/Navigation"
import { useAppState } from "./hooks/useAppState"
import { Day } from "./views/Day"
import Editor from "./views/Editor"
import { Month } from "./views/Month"
import { Week } from "./views/Week"
import React from "react"

const SchedulerComponent = () => {
	const {loading, view, dialog, height} = useAppState()

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
		<Box sx={{
			height,
			position: "relative",
			display: 'flex',
			flexDirection: 'column'
		}}>
			{loading &&
            <Box sx={{
				background: theme => theme.palette.action.disabledBackground,
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
			}}>
                <CircularProgress size={50}/>
                <Typography
                    sx={{pt: 10}}
                    align="center">Loading...</Typography>
            </Box>
			}

			<Navigation/>
			{/*Table*/}
			<Box
				sx={{
					flexGrow: 1,
					height,
					width: "100%",
					overflowX: "auto",
					overflowY: "hidden",
				}}
			>
				{Views}
			</Box>
			{dialog && <Editor/>}
		</Box>
	)
}

export { SchedulerComponent }
