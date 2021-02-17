[ngetopts](../README.md) / parse

# Module: parse

## Table of contents

### Functions

- [parse](parse.md#parse)

## Functions

### parse

▸ `Const`**parse**(`schema`: [_Schema_](../interfaces/interfaces_schema.schema.md), `inputArgs?`: _string_[]): [_ParsedArgs_](../interfaces/interfaces_parsed_args.parsedargs.md)

Parse CLI arguments.

#### Parameters:

| Name        | Type                                                  | Description                                |
| :---------- | :---------------------------------------------------- | :----------------------------------------- |
| `schema`    | [_Schema_](../interfaces/interfaces_schema.schema.md) | CLI schema.                                |
| `inputArgs` | _string_[]                                            | CLI input. Will default to `process.argv`. |

**Returns:** [_ParsedArgs_](../interfaces/interfaces_parsed_args.parsedargs.md)

Defined in: [parse.ts:64](https://github.com/prasadrajandran/ngetopts/blob/41ceb2b/src/parse.ts#L64)
