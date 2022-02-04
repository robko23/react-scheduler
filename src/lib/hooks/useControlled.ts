// source (edited)
// https://github.com/mui-org/material-ui/blob/27f1c282cf4a8c5b5aa175b8b594d3a726a8474b/packages/mui-utils/src/useControlled.js

import * as React from 'react'

interface UseControlled<T> {
	/**
	 * Holds the component value when it's controlled.
	 */
	controlled: T | undefined;
	/**
	 * The default value when uncontrolled.
	 */
	default: T | undefined;
	/**
	 * The component name displayed in warnings.
	 */
	name: string;
	/**
	 * The name of the state variable displayed in warnings.
	 */
	state?: string;

	/**
	 * Fires whenever something tries to update the value
	 * @param newValue updated value
	 */
	controlledCallback: ((newValue: T) => void) | undefined
}

export default function useControlled<T>({
	controlled,
	default: defaultProp,
	name,
	state = 'value',
	controlledCallback
}: UseControlled<T>) {
	// isControlled is ignored in the hook dependency lists as it should never change.
	const {current: isControlled} = React.useRef(controlled !== undefined)
	const [ valueState, setValue ] = React.useState(defaultProp)
	const value = isControlled ? controlled : valueState

	if ( process.env.NODE_ENV !== 'production' ) {
		React.useEffect(() => {
			if ( isControlled !== (controlled !== undefined) ) {
				console.error(
					[
						`MUI: A component is changing the ${
							isControlled ? '' : 'un'
						}controlled ${state} state of ${name} to be ${isControlled ? 'un' : ''}controlled.`,
						'Elements should not switch from uncontrolled to controlled (or vice versa).',
						`Decide between using a controlled or uncontrolled ${name} ` +
						'element for the lifetime of the component.',
						"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
						'More info: https://fb.me/react-controlled-components',
					].join('\n'),
				)
			}
		}, [ state, name, controlled ])

		const {current: defaultValue} = React.useRef(defaultProp)

		React.useEffect(() => {
			if ( !isControlled && defaultValue !== defaultProp ) {
				console.error(
					[
						`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` +
						`To suppress this warning opt to use a controlled ${name}.`,
					].join('\n'),
				)
			}
		}, [ JSON.stringify(defaultProp) ])
	}

	const setValueIfUncontrolled = React.useCallback((newValue: T) => {
		if ( isControlled ) {
			controlledCallback?.(newValue)
		} else {
			setValue(newValue)
		}
	}, [])

	return [ value, setValueIfUncontrolled ]
}