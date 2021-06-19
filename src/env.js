import * as dotenv from 'dotenv';
dotenv.config();

/**
 * @param {string} name The name of the environment variable
 * @param {string} fallback The default value of the environment variable, if not supplied.
 * @returns {string} the value of the environment variable
 * @throws {Error} if a value could not be determined
 */
const get = (name, fallback) => {
  const value = process.env[name];
  if (!value && fallback === undefined) {
    throw new Error(`Environment variable ${name} must be provided.`);
  }
  return value;
};

/**
 * @param {string} name The name of the environment variable
 * @param {string} fallback The default value of the environment variable, if not supplied.
 * @returns {string} the value of the environment variable
 * @throws {Error} if a value could not be determined
 */
const string = get;

/**
 * @param {string} name The name of the environment variable
 * @param {string} fallback The default value of the environment variable, if not supplied.
 * @returns {number} the value of the environment variable
 * @throws {Error} if a value could not be determined, or the value was not an integer
 */
const int = (name, fallback) => {
  const value = Math.floor(get(name, fallback));
  if (Number.isNaN(value)) {
    throw new Error(`Environment variable ${name} must be an integer.`);
  }
  return value;
};

export const TOKEN = string('TOKEN');
export const MESSAGE_TIMEOUT = int('MESSAGE_TIMEOUT', '5000');
export const COMMAND_PREFIX = string('COMMAND_PREFIX', '!');
export const DB_USER = string('DB_USER');
export const DB_HOST = string('DB_HOST');
export const DB_DATABASE = string('DB_DATABASE');
export const DB_PASSWORD = string('DB_PASSWORD');
export const DB_PORT = int('DB_PORT', '5432');
