// index.d.ts

type Binary = Buffer | Uint8Array;

/**
 * Suite hosts all examinations.
 */

export declare class Suite
{
	constructor();

	getExams(group: string): Array<Exam>;

	getGroups(): Array<string>;
}

/**
 * Exam hosts a pair of encoded msgpack representations and decoded values.
 */

export declare class Exam
{
	constructor(src: object);

	getMsgpacks(): Array<Binary>;

	getTypes(types?: object): Array<string>;

	getValue(type: string): any;

	matchMsgpack(encoded: Binary): boolean;

	matchValue(value: any): boolean;

	stringify(idx: number): string;
	stringify(type: string): string;
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
}
