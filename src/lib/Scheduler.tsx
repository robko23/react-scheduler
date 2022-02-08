import React, { memo } from "react"
import { AppState } from "./context/state/State"
import { SchedulerComponent } from "./SchedulerComponent"
import { Scheduler as SchedulerProps } from "./types"

const Scheduler = memo((props: SchedulerProps) => {
	return (
		<AppState passedProps={props}>
			<SchedulerComponent/>
		</AppState>
	)
})

export { Scheduler }
