// index.d.ts

type Binary = Buffer | Uint8Array;

/**
 * Group hosts all examinations.
 */

export declare class Group
{
	constructor();

	static getGroups(): Array<Group>;

	getExams(filter?: object): Array<Exam>;

	toString(): string;
}

/**
 * Exam hosts a pair of encoded msgpack representations and decoded values.
 */

export declare class Exam
{
	constructor(src: object);

	static getExams(filter?: object): Array<Exam>;

	getMsgpacks(): Array<Binary>;

	getTypes(filter?: object): Array<Type>;

	getValue(type: Type | string): any;

	matchMsgpack(encoded: Binary): boolean;

	matchValue(value: any): boolean;

	stringify(idx: number): string;
	stringify(type: Type | string): string;
}

/**
 * Type provides functions to read exam definitions.
 */

export declare class Type
{
	constructor();

	static getType(type: string): Type;

	compare(a: any, b: any): boolean;

	parse(string: string): boolean;

	toString(): string;
}
