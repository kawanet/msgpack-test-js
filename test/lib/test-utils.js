/**
 * Utilities for tests
 */

var U = module.exports = {};

U.stringify = stringify;

function stringify(buffer) {
  return [].map.call(buffer, hex).join("-");
}

function hex(v) {
  return (v > 15 ? "" : "0") + (v | 0).toString(16);
}
