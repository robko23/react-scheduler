import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded"
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded"
import { Box, ButtonBase, Paper, SxProps, Theme, Typography, useTheme, } from "@mui/material"
import { styled } from "@mui/material/styles"
import { format } from "date-fns"
import React, { Fragment, ReactElement } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { CalendarEvent } from "../../types"

interface EventItemProps {
	event: CalendarEvent;
	multiday: boolean;
	hasPrev?: boolean;
	hasNext?: boolean;
	showdate?: boolean;
	sx?: SxProps<Theme>
}

const EventItemRoot = styled(Paper, {
	shouldForwardProp: prop => prop !== 'disabled' && prop !== 'color'
})<{ color?: string }>(({theme, color}) => ({
	width: "100%",
	display: "block",
	background: color || theme.palette.primary.main,
	color: theme.palette.getContrastText(color || theme.palette.primary.main),
	overflow: "hidden",
}))

const Item = styled(Box)(({theme}) => ({
	padding: theme.spacing(0.3)
}))

const Multiday = styled(Box)(({theme}) => ({
	padding: theme.spacing(0.3),
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
}))

const EventItem = ({
	event,
	multiday,
	hasPrev,
	hasNext,
	showdate,
	sx
}: EventItemProps): ReactElement<EventItemProps> => {
	const {
		direction,
		locale,
		onEventClick,
		disableDrag
	} = useCalendarProps()
	const theme = useTheme()

	const NextArrow =
		direction === "rtl" ? ArrowLeftRoundedIcon : ArrowRightRoundedIcon
	const PrevArrow =
		direction === "rtl" ? ArrowRightRoundedIcon : ArrowLeftRoundedIcon


	let item = (
		<Item className='Item'>
			<Typography variant="subtitle2" style={{fontSize: 12}} noWrap>
				{event.title}
			</Typography>
			{showdate && (
				<Typography style={{fontSize: 11}} noWrap>
					{`${format(event.start, "hh:mm a", {
						locale: locale,
					})} - ${format(event.end, "hh:mm a", {locale: locale})}`}
				</Typography>
			)}
		</Item>
	)

	if ( multiday ) {
		item = (
			<Multiday className='Multiday'>
				<Typography sx={{fontSize: 11}} noWrap>
					{hasPrev ? (
						<PrevArrow fontSize="small" sx={{display: "flex"}}/>
					) : (
						showdate && format(event.start, "hh:mm a", {locale: locale})
					)}
				</Typography>
				<Typography
					variant="subtitle2"
					align="center"
					sx={{fontSize: 12}}
					noWrap
				>
					{event.title}
				</Typography>
				<Typography sx={{fontSize: 11}} noWrap>
					{hasNext ? (
						<NextArrow fontSize="small" sx={{display: "flex"}}/>
					) : (
						showdate && format(event.end, "hh:mm a", {locale: locale})
					)}
				</Typography>
			</Multiday>
		)
	}

	return (
		<Fragment>
			<EventItemRoot color={event.color} className='EventItem' sx={sx} elevation={2}>
				<ButtonBase
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						onEventClick?.(event, e)
					}}
					disabled={event.disabled}
					sx={{
						width: "100%",
						height: "100%",
						display: "block",
						background: event.disabled ? (theme) => theme.palette.action.disabled : "inherit"
					}}
					draggable={!disableDrag}
					onDragStart={(e) => {
						e.stopPropagation()
						e.dataTransfer.setData("text/plain", `${event.id}`)
						e.currentTarget.style.backgroundColor = theme.palette.error.main
					}}
					onDragEnd={(e) => {
						e.currentTarget.style.backgroundColor =
							event.color || theme.palette.primary.main
					}}
					onDragOver={(e) => {
						e.stopPropagation()
						e.preventDefault()
					}}
					onDragEnter={(e) => {
						e.stopPropagation()
						e.preventDefault()
					}}
				>
					{item}
				</ButtonBase>
			</EventItemRoot>

		</Fragment>
	)
}

EventItem.defaultProps = {
	multiday: false,
	showdate: true,
}

export default EventItem
