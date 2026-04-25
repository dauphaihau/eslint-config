// Testing exported constant naming rules
// Exported const bindings should be UPPER_CASE

// // Valid: exported constants in UPPER_CASE
// export const API_KEY = 'secret-key';
// export const MAX_RETRIES = 3;
// export const CONFIG_VALUE = 'config';
// export const DB_HOST = 'localhost';
// export const PORT_8080 = 8080;
// export const VERSION_1_0 = '1.0';

// // Valid: local const values stay camelCase
// const apiKey = 'secret-key';
// const maxRetries = 3;
// const configValue = 'config';

// // Invalid: exported const values that are not UPPER_CASE
// export const apiKey = 'secret-key'; // Error: should be API_KEY
// export const maxRetries = 3; // Error: should be MAX_RETRIES
// export const configValue = 'config'; // Error: should be CONFIG_VALUE

// // Edge cases
// export const _PRIVATE_CONST = 'private'; // Valid: leading underscore allowed
// export const CONST_WITH_NUMBERS_123 = 123; // Valid: numbers allowed in UPPER_CASE
