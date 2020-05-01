import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

function getEnvVariable(
  name: string,
  type: 'string' | 'number',
): string | number {
  const variable = process.env[name];
  if (variable == undefined)
    throw Error(`[dotenv] variable '${name}' of type '${type}' wasn't found.`);
  if (type === 'number' && typeof variable === 'number')
    throw Error(
      `[dotenv] variable '${name}' of type '${type}' is not a number.`,
    );

  return type === 'string' ? variable.toString() : Number(variable);
}

export const SERVER_PORT = getEnvVariable('SERVER_PORT', 'number') as number;
export const GOOGLE_SHEETS_API_KEY = getEnvVariable(
  'GOOGLE_SHEETS_API_KEY',
  'string',
) as string;
export const GOOGLE_DOCUMENT_ID = getEnvVariable(
  'GOOGLE_DOCUMENT_ID',
  'string',
) as string;
