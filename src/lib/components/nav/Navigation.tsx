import MoreVertIcon from "@mui/icons-material/MoreVert"
import {
	Button,
	IconButton,
	MenuItem,
	MenuList,
	Popover,
	Toolbar as MuiToolbar,
	useMediaQuery,
	useTheme,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import React, { Fragment, memo, useState } from "react"
import { useAppState } from "../../hooks/useAppState"
import { LocalizationTexts } from "../../types"
import { DayDateBtn } from "./DayDateBtn"
import { MonthDateBtn } from "./MonthDateBtn"
import { WeekDateBtn } from "./WeekDateBtn"

export type View = "month" | "week" | "day";

const Toolbar = styled(MuiToolbar, {
	name: 'Toolbar'
})({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
})

export type RenderNavigationProps = {
	dateSelector: JSX.Element,
	todayButton: JSX.Element,
	viewSelector: JSX.Element,
	isDesktop: boolean
}

const getViewText = (view: View, localizationTexts?: LocalizationTexts) => localizationTexts?.[view] ?? view

const Navigation = memo(() => {
	const {selectedDate, view, week, handleState, getViews, localizationTexts, renderNavigation} = useAppState()
	const [ anchorEl, setAnchorEl ] = useState<Element | null>(null)
	const theme = useTheme()
	const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))
	const views = getViews()

	const toggleMoreMenu = (el?: Element) => {
		setAnchorEl(el || null)
	}

	const renderDateSelector = () => {
		switch ( view ) {
			case "month":
				return (
					<MonthDateBtn selectedDate={selectedDate} onChange={handleState}/>
				)
			case "week":
				return (
					<WeekDateBtn
						selectedDate={selectedDate}
						onChange={handleState}
						weekProps={week!}
					/>
				)
			case "day":
				return (
					<DayDateBtn selectedDate={selectedDate} onChange={handleState}/>
				)
			default:
				return <></>
		}
	}

	const dateSelector = renderDateSelector()
	const todayButton = (
		<Button onClick={() => handleState(new Date(), "selectedDate")}>
			{localizationTexts?.today ?? "Today"}
		</Button>
	)

	let viewSelector = <>{views.map((v) => (
		<Button
			key={v}
			color={v === view ? "primary" : "inherit"}
			onClick={() => handleState(v, "view")}
			onDragOver={(e) => {
				e.preventDefault()
				handleState(v, "view")
			}}
		>
			{getViewText(v, localizationTexts)}
		</Button>
	))}</>

	if ( !isDesktop ) {
		viewSelector = (
			<Fragment>
				<IconButton
					style={{padding: 5}}
					onClick={(e) => {
						toggleMoreMenu(e.currentTarget)
					}}
				>
					<MoreVertIcon/>
				</IconButton>
				<Popover
					open={Boolean(anchorEl)}
					anchorEl={anchorEl}
					onClose={(e) => {
						toggleMoreMenu()
					}}
					anchorOrigin={{
						vertical: "center",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
				>
					<MenuList autoFocusItem={!!anchorEl} disablePadding>
						{views.map((v) => (
							<MenuItem
								key={v}
								selected={v === view}
								onClick={() => {
									toggleMoreMenu()
									handleState(v, "view")
								}}
							>
								{getViewText(v, localizationTexts)}
							</MenuItem>
						))}
					</MenuList>
				</Popover>
			</Fragment>
		)
	}

	if ( views.length === 0 ) {
		viewSelector = <></>
	}

	let content = (
		<>
			<div>
				{dateSelector}
				{todayButton}
			</div>
			<div>
				{viewSelector}
			</div>
		</>
	)

	if(renderNavigation)
		content = renderNavigation({
			dateSelector, todayButton, viewSelector, isDesktop
		})

	return (
		<Toolbar className="Toolbar">
			{content}
		</Toolbar>
	)
})

export { Navigation }
