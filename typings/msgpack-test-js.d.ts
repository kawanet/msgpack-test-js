// index.d.ts

/**
 * Group hosts all examinations.
 */

export declare class Group {
    constructor();

    static getGroups(): Group[];

    getExams(filter?: object): Exam[];

    toString(): string;
}

/**
 * Exam hosts a pair of encoded msgpack representations and decoded values.
 */

export declare class Exam {
    constructor(src: object);

    static getExams(filter?: object): Exam[];

    getMsgpacks(): Buffer[];
    getMsgpacks(): number[][];

    getTypes(filter?: object): Type[];

    getValue(type: Type | string): any;

    matchMsgpack(encoded: Buffer): boolean;
    matchMsgpack(encoded: number[]): boolean;

    matchValue(value: any): boolean;

    stringify(idx: number): string;
    stringify(type: Type | string): string;
}

/**
 * Type provides functions to read exam definitions.
 */

export declare class Type {
    constructor();

    static getType(type: string): Type;

    compare(a: any, b: any): boolean;

    parse(string: string): boolean;

    toString(): string;
}
