/* eslint no-unused-vars: off */

const first = 1;
const second = 2;
const third = 3;

// Valid: single-line arrays and objects do not need trailing commas.
const singleLineArray = [first, second];
const singleLineObject = { first, second };

// Valid: multiline arrays and objects require trailing commas.
const validMultilineArray = [
  first,
  second,
  third,
];

const validMultilineObject = {
  first,
  second,
  third,
};

// Invalid: multiline arrays and objects without trailing commas.
const invalidMultilineArray = [
  first,
  second,
  third
];

const invalidMultilineObject = {
  first,
  second,
  third
};

// Valid: multiline imports and exports require trailing commas.
import {
  readFile,
  writeFile,
} from 'node:fs/promises';

export {
  first,
  second,
};

// Invalid: multiline imports and exports without trailing commas.
import {
  chmod,
  stat
} from 'node:fs/promises';

export {
  third
};

// Valid: multiline functions require trailing commas.
function validDeclaration(
  alpha,
  beta,
) {
  return alpha + beta;
}

const validExpression = function (
  alpha,
  beta,
) {
  return alpha + beta;
};

const validArrow = (
  alpha,
  beta,
) => alpha + beta;

validDeclaration(first, second);
validExpression(first, second);
validArrow(first, second);
readFile;
writeFile;
chmod;
stat;

// Invalid: multiline functions without trailing commas.
function invalidDeclaration(
  alpha,
  beta
) {
  return alpha + beta;
}

const invalidExpression = function (
  alpha,
  beta
) {
  return alpha + beta;
};

const invalidArrow = (
  alpha,
  beta
) => alpha + beta;
