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
import React, { Fragment, memo, ReactNode, useCallback, useState } from "react"
import { TODAY } from "../../helpers/constants"
import { getAvailableViews } from "../../helpers/generals"
import { useCalendarProps } from "../../hooks/useCalendarProps"
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
	dateSelector: ReactNode,
	todayButton: ReactNode,
	viewSelector: ReactNode,
	isDesktop: boolean
}

const getViewText = (view: View, localizationTexts?: LocalizationTexts) => localizationTexts?.[view] ?? view

const Navigation = memo(() => {
	const {selectedDate = TODAY, view, week, localizationTexts, renderNavigation, day, month, onDateChange, onViewChange} = useCalendarProps()
	const [ anchorEl, setAnchorEl ] = useState<Element | null>(null)
	const theme = useTheme()
	const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))
	const views = getAvailableViews(month, week, day)

	const toggleMoreMenu = (el?: Element) => {
		setAnchorEl(el || null)
	}

	const renderDateSelector = useCallback(() => {
		switch ( view ) {
			case "month":
				return (
					<MonthDateBtn selectedDate={selectedDate}/>
				)
			case "week":
				return (
					<WeekDateBtn
						selectedDate={selectedDate}
						weekProps={week!}
					/>
				)
			case "day":
				return (
					<DayDateBtn selectedDate={selectedDate}/>
				)
			default:
				return <></>
		}
	}, [view, selectedDate])

	const dateSelector = renderDateSelector()
	const todayButton = (
		<Button onClick={() => onDateChange?.(new Date())}>
			{localizationTexts?.today ?? "Today"}
		</Button>
	)

	let viewSelector: ReactNode = views.map((v) => (
		<Button
			key={v}
			color={v === view ? "primary" : "inherit"}
			onClick={() => onViewChange?.(v)}
			onDragOver={(e) => {
				e.preventDefault()
				onViewChange?.(v)
			}}
		>
			{getViewText(v, localizationTexts)}
		</Button>
	))

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
									onViewChange?.(v)
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

	if ( renderNavigation ) {
		content = renderNavigation({
			dateSelector, todayButton, viewSelector, isDesktop
		})
	}

	return (
		<Toolbar className="Toolbar">
			{content}
		</Toolbar>
	)
})

export { Navigation }
