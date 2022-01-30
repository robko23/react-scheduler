import {objectDifference} from './object'

describe('Object difference test', () => {
	it('Should compare simple object of strings', () => {
		const orig = {
			a: 'A',
			b: 'B'
		}
		const updated = {
			a: 'C',
			b: 'B'
		}
		expect(objectDifference(orig, updated)).toMatchObject({a: 'C'})
	})
	it('Should skip item and include it in the result', () => {
		const user1 = {
			name: 'John',
			age: 25,
			guid: '850982dc-80ee-46d7-8423-fa8e09ee330c'
		}
		const user2 = {
			name: 'John',
			age: 26,
			guid: '850982dc-80ee-46d7-8423-fa8e09ee330c'
		}
		expect(objectDifference(user1, user2, ["guid"])).toMatchObject({
			age: 26,
			guid: '850982dc-80ee-46d7-8423-fa8e09ee330c'
		})
	})
	it('Should compare numbers', () => {
		const obj1 = {
			string: 'string',
			number: 26,
			bool: false
		}
		const obj2 = {
			string: 'string',
			number: 28,
			bool: false
		}
		expect(objectDifference(obj1, obj2)).toMatchObject({number: 28})
	})
	it('Should compare booleans', () => {
		const obj1 = {
			string: 'string',
			number: 26,
			bool: false
		}
		const obj2 = {
			string: 'string',
			number: 26,
			bool: true
		}
		expect(objectDifference(obj1, obj2)).toMatchObject({bool: true})
	})
	it('Should compare functions', () => {
		const fun = () => {}
		const obj1 = {
			string: 'string',
			number: 26,
			bool: false,
			fun
		}
		const obj2 = {
			string: 'string',
			number: 26,
			bool: false,
			fun
		}
		expect(objectDifference(obj1, obj2)).toMatchObject({})
	})
	it('Should return empty object', () => {
		const obj1 = {
			string: 'string',
			number: 26,
			bool: false
		}
		const obj2 = {
			string: 'string',
			number: 26,
			bool: false
		}
		expect(objectDifference(obj1, obj2)).toMatchObject({})
	})
	it('Should handle more complex object', () => {
		const orig_props = {
			something: true,
			complex: {
				age: 26,
				name: 'John'
			}
		}
		const updated_props = {
			something: true,
			complex: {
				age: 28,
				name: 'John'
			}
		}
		expect(objectDifference(orig_props, updated_props)).toMatchObject({complex: {age: 28}})
	})
})