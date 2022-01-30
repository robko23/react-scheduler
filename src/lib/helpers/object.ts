export const objectDifference = <T extends Object>(original: T, updated: T, skip?: Array<keyof T>): Partial<T> => {
	const result: Partial<T> = {}
	Object.keys(original).forEach(untyped_key => {
		const key = untyped_key as keyof T
		const original_item = original[key]
		const updated_item = updated[key]
		if(skip?.includes(key)) {
			result[key] = original_item
			return
		}
		if ( typeof original_item === 'object' ) { // @ts-ignore
			result[key] = objectDifference(original_item, updated_item, skip)
		} else {
			if ( original_item !== updated_item ) {
				result[key] = updated_item
			}
		}
	})
	return result
}