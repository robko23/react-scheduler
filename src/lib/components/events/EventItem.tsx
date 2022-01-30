import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded"
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded"
import ClearRoundedIcon from "@mui/icons-material/ClearRounded"
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded"
import {
	Box,
	Button,
	ButtonBase,
	IconButton,
	Paper,
	Popover,
	Slide,
	SxProps,
	Theme,
	Typography,
	useTheme,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { format } from "date-fns"
import React, { Fragment, ReactElement, useState } from "react"
import { useAppState } from "../../hooks/useAppState"
import { PopperInner } from "../../styles/styles"
import { ProcessedEvent } from "../../types"

interface EventItemProps {
	event: ProcessedEvent;
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
	color: theme.palette.primary.contrastText,
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
		triggerDialog,
		onDelete,
		events,
		handleState,
		triggerLoading,
		viewerExtraComponent,
		fields,
		direction,
		locale,
		viewerTitleComponent,
		localizationTexts,
		onEventClick,
		disableViewer,
		disableDrag
	} = useAppState()
	const [ anchorEl, setAnchorEl ] = useState<Element | null>(null)
	const [ deleteConfirm, setDeleteConfirm ] = useState(false)
	const theme = useTheme()

	const NextArrow =
		direction === "rtl" ? ArrowLeftRoundedIcon : ArrowRightRoundedIcon
	const PrevArrow =
		direction === "rtl" ? ArrowRightRoundedIcon : ArrowLeftRoundedIcon

	const triggerViewer = (el?: Element) => {
		if ( !el && deleteConfirm ) {
			setDeleteConfirm(false)
		}
		setAnchorEl(el || null)
	}

	const handleConfirmDelete = async () => {
		try {
			triggerLoading(true)
			let deletedId = event.event_id
			// Trigger custom/remote when provided
			if ( onDelete ) {
				const remoteId = await onDelete(deletedId)
				if ( remoteId ) {
					deletedId = remoteId
				} else {
					deletedId = ""
				}
			}
			if ( deletedId ) {
				const updatedEvents = events.filter((e) => e.event_id !== deletedId)
				handleState(updatedEvents, "events")
				triggerViewer()
			}
		} catch ( error ) {
			console.error(error)
		} finally {
			triggerLoading(false)
		}
	}

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

	const renderViewer = () => {

		return (
			<PopperInner>
				<div
					style={{
						background: event.color || theme.palette.primary.main,
						color: theme.palette.primary.contrastText,
					}}
				>
					<div className="rs__popper_actions">
						<div>
							<IconButton
								size="small"
								style={{color: theme.palette.primary.contrastText}}
								onClick={() => {
									triggerViewer()
								}}
							>
								<ClearRoundedIcon color="disabled"/>
							</IconButton>
						</div>
						<div style={{display: "inherit"}}>
							<IconButton
								size="small"
								style={{color: theme.palette.primary.contrastText}}
								onClick={() => {
									triggerViewer()
									triggerDialog(true, event)
								}}
							>
								<EditRoundedIcon/>
							</IconButton>
							{!deleteConfirm && (
								<IconButton
									size="small"
									style={{color: theme.palette.primary.contrastText}}
									onClick={() => setDeleteConfirm(true)}
								>
									<DeleteRoundedIcon/>
								</IconButton>
							)}
							<Slide
								in={deleteConfirm}
								direction={direction === "rtl" ? "right" : "left"}
								mountOnEnter
								unmountOnExit
							>
								<div>
									<Button
										style={{color: theme.palette.error.main}}
										size="small"
										onClick={handleConfirmDelete}
									>
										{localizationTexts?.delete ?? "DELETE"}
									</Button>
									<Button
										style={{color: theme.palette.action.disabled}}
										size="small"
										onClick={() => setDeleteConfirm(false)}
									>
										{localizationTexts?.cancel ?? "CANCEL"}
									</Button>
								</div>
							</Slide>
						</div>
					</div>
					{viewerTitleComponent instanceof Function ? (
						viewerTitleComponent(event)
					) : (
						<Typography style={{padding: "5px 0"}} noWrap>
							{event.title}
						</Typography>
					)}
				</div>
				<div style={{padding: "5px 10px"}}>
					<Typography
						style={{display: "flex", alignItems: "center"}}
						color="textSecondary"
						variant="caption"
						noWrap
					>
						<EventNoteRoundedIcon/>{" "}
						{`${format(event.start, "dd MMMM yyyy hh:mm a", {
							locale: locale,
						})} - ${format(event.end, "dd MMMM yyyy hh:mm a", {
							locale: locale,
						})}`}
					</Typography>
					{viewerExtraComponent instanceof Function
						? viewerExtraComponent(fields, event)
						: viewerExtraComponent}
				</div>
			</PopperInner>
		)
	}

	return (
		<Fragment>
			<EventItemRoot color={event.color} className='EventItem' sx={sx} elevation={2}>
				<ButtonBase
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						if ( !disableViewer ) {
							triggerViewer(e.currentTarget)
						}
						onEventClick?.(event)
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
						e.dataTransfer.setData("text/plain", `${event.event_id}`)
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

			{/* Viewer */}
			{!disableViewer &&
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={(e) => {
					triggerViewer()
				}}
                anchorOrigin={{
					vertical: "center",
					horizontal: "center",
				}}
                transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
                onClick={(e) => {
					e.stopPropagation()
				}}
            >
				{renderViewer()}
            </Popover>
			}

		</Fragment>
	)
}

EventItem.defaultProps = {
	multiday: false,
	showdate: true,
}

export default EventItem
