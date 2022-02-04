import React, { ReactChild } from "react"
import { SchedulerProps } from "../../types"
import { StateContext } from "./stateContext"

interface AppProps {
	children: ReactChild;
	passedProps: SchedulerProps;
}

const AppState = ({passedProps, children}: AppProps) => {

	return (
		<StateContext.Provider value={passedProps}>
			{children}
		</StateContext.Provider>
	)
}

export { AppState }
