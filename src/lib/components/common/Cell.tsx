import { alpha, Button, useTheme } from "@mui/material"
import React, { ForwardedRef, forwardRef } from "react"
import { useAppState } from "../../hooks/useAppState"

interface CellProps {
	start: Date;
	end: Date;
	children?: JSX.Element;
}

const Cell = forwardRef(({
	start,
	end,
	children,
}: CellProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {triggerDialog, onDrop, disableEditor, onCellClick} = useAppState()
	const theme = useTheme()

	return (
		<Button
			ref={ref}
			fullWidth
			onClick={() => {
				if(!disableEditor)
					triggerDialog(true, {
						start,
						end
					})
				onCellClick?.(start, end)
			}}
			onDragOver={(e) => {
				e.currentTarget.style.backgroundColor = alpha(
					theme.palette.secondary.main,
					0.3
				)
				e.preventDefault()
			}}
			onDragEnter={(e) => {
				e.currentTarget.style.backgroundColor = alpha(
					theme.palette.secondary.main,
					0.3
				)
			}}
			onDragLeave={(e) => {
				e.currentTarget.style.backgroundColor = ""
			}}
			onDrop={(e) => {
				e.currentTarget.style.backgroundColor = ""
				const eventId = e.dataTransfer.getData("text")
				onDrop(eventId, start)
			}}
		>
			{children}
		</Button>
	)
})

export { Cell }
