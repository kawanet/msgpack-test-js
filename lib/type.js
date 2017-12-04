/**
 * Decoded class to host a decoded value.
 */

var Int64 = require("int64-buffer");

exports.Type = Type;

Type.getType = getType;

Type.prototype.compare = compareStrict;
Type.prototype.parse = through;

var types = {};
types.array = new Type();
types.bignum = new Type();
types.binary = new Type();
types.bool = new Type();
types.map = new Type();
types.nil = new Type();
types.number = new Type();
types.string = new Type();

types.array.compare = compareDeep;
types.bignum.compare = compareString;
types.binary.compare = compareBinary;
types.map.compare = compareMap;
types.number.compare = compareNumber;
types.string.compare = compareString;

types.bignum.parse = parseBignum;
types.binary.parse = parseBinary;

function Type() {
  if (!(this instanceof Type)) return new Type();
}

function getType(type) {
  return types[type];
}

function through(value) {
  return value;
}

function parseBignum(str) {
  var orig = str += "";
  var parser = (str[0] === "-") ? Int64.Int64BE : Int64.Uint64BE;
  str = str.replace(/0x/, "");
  var radix = (str !== orig) ? 16 : 10;
  return parser(str, radix);
}

function parseBinary(str) {
  var array = str && str.split(/[^0-9a-fA-F]+/g).map(parseHex) || [];
  return Buffer.from ? Buffer.from(array) : new Buffer(array);
}

function parseHex(str) {
  return parseInt(str, 16) || 0;
}

function compareString(a, b) {
  return "" + a === "" + b;
}

function compareNumber(a, b) {
  return +a === +b;
}

function compareStrict(a, b) {
  return a === b;
}

function compareBinary(a, b) {
  var aLen = a.length;
  var bLen = b.length;
  if (aLen !== bLen) return false;

  return [].every.call(a, function(value, idx) {
    return value === b[idx];
  });
}

function compareMap(a, b) {
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  return [].every.call(aKeys, function(key) {
    return (key in b) && compareDeep(a[key], b[key]);
  });
}

function compareDeep(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
