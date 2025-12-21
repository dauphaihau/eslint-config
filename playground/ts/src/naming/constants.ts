// Testing constant naming rules
// Constants matching ^[A-Z0-9_]+$ pattern should be UPPER_CASE

// // Valid: UPPER_CASE constants matching the pattern
// const API_KEY = 'secret-key';
// const MAX_RETRIES = 3;
// const CONFIG_VALUE = 'config';
// const DB_HOST = 'localhost';
// const PORT_8080 = 8080;
// const VERSION_1_0 = '1.0';

// // Valid: camelCase constants that don't match the pattern
// const apiKey = 'secret-key'; // Valid: doesn't match ^[A-Z0-9_]+$, so camelCase is fine
// const maxRetries = 3; // Valid: doesn't match pattern, camelCase is fine
// const configValue = 'config'; // Valid: doesn't match pattern, camelCase is fine

// // Invalid: const variables matching the pattern but not UPPER_CASE
// const api_key = 'secret'; // Error: matches pattern, should be API_KEY
// const max_retries = 3; // Error: matches pattern, should be MAX_RETRIES
// const ConfigValue = 'config'; // Error: matches pattern (sort of), but should be UPPER_CASE or camelCase

// // Edge cases
// const _PRIVATE_CONST = 'private'; // Valid: leading underscore allowed
// const CONST_WITH_NUMBERS_123 = 123; // Valid: numbers allowed in UPPER_CASE
