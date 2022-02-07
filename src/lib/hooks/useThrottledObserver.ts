import { useMemo, useState } from "react"
import useResizeObserver from "use-resize-observer"
import throttle from 'lodash.throttle'

export const useThrottledResizeObserver = <T extends HTMLElement>(wait: number) => {
	const [size, setSize] = useState<{height: number | undefined, width: number | undefined}>({width: 1, height: 1});
	const onResize = useMemo(() => throttle(setSize, wait), [wait]);
	const { ref } = useResizeObserver<T>({ onResize});

	return { ref, ...size };
};
