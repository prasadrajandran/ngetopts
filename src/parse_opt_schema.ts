import { OptSchema } from './interfaces/schema';
import {
  ParsedOptSchemaMap,
  ParsedOptSchema,
} from './interfaces/parsed_schema';
import { SchemaError } from './classes/errors';

/**
 * A option can only be made out of alphanumeric characters.
 *
 * E.g.:
 * - '-a'
 * - '-B'
 * @internal
 */
export const OPT_SCHEMA_REGEX = /^-[a-zA-Z\d]$/;

/**
 * A long option can only be made out of alphanumeric characters and the words
 * can be separated by a single dash.
 *
 * E.g.:
 * - '--help'
 * - '--show-hidden-files'
 * @internal
 */
export const LONG_OPT_SCHEMA_REGEX = /^--[a-zA-Z\d]+(-([a-zA-Z\d])+)*$/;

/**
 * Parse an option's schema.
 * @internal
 * @param optSchemas - OptSchemas
 */
export const parseOptSchema = (optSchemas: OptSchema[]): ParsedOptSchemaMap => {
  const opts: ParsedOptSchemaMap = new Map();

  for (const { name, longName, arg, optArgFilter } of optSchemas) {
    // Note: The fact that the "ParsedOptSchema" object is shared (i.e. it's the
    // same object reference) between option and long option is intentional. If
    // a property is updated in the ParsedOptSchema, we want that to affect all
    // options that share that object.
    const parsedOptSchema: ParsedOptSchema = {
      argAccepted: arg === 'required' || arg === 'optional',
      argRequired: arg === 'required',
      optArgFilter: optArgFilter || ((arg: string) => arg),
      parsedDuplicates: new Set(),
      parsedName: null,
    };

    if (!name && !longName) {
      throw new SchemaError(`Option must have a name or a long name defined`);
    }

    if (!parsedOptSchema.argAccepted && optArgFilter) {
      throw new SchemaError(
        `optArgFilter provided but "${name || longName}" does not accept an ` +
          `argument. Do not forget to set the "arg" property too.`,
      );
    }

    if (
      parsedOptSchema.argAccepted &&
      !parsedOptSchema.argRequired &&
      !longName
    ) {
      throw new SchemaError(
        `Since arguments are optional for "${name}", a long option must also ` +
          `be defined because only long options are able to accept optional ` +
          `arguments`,
      );
    }

    if (name) {
      if (!OPT_SCHEMA_REGEX.test(name)) {
        throw new SchemaError(`"${name}" is an invalid name for an option`);
      } else if (opts.has(name)) {
        throw new SchemaError(`"${name}" is a duplicate option`);
      }
      opts.set(name, parsedOptSchema);
    }

    if (longName) {
      if (!LONG_OPT_SCHEMA_REGEX.test(longName)) {
        throw new SchemaError(
          `"${longName}" is an invalid name for a long option`,
        );
      } else if (opts.has(longName)) {
        throw new SchemaError(`"${longName}" is a duplicate long option`);
      }
      opts.set(longName, parsedOptSchema);
    }
  }

  return opts;
};
