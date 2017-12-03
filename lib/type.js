/**
 * Decoded class to host a decoded value.
 */

var Int64 = require("int64-buffer");

exports.Type = Type;

Type.prototype.compare = compareStrict;
Type.prototype.parse = through;

Type.array = new Type();
Type.bignum = new Type();
Type.binary = new Type();
Type.bool = new Type();
Type.map = new Type();
Type.nil = new Type();
Type.number = new Type();
Type.string = new Type();

Type.array.compare = compareDeep;
Type.bignum.compare = compareString;
Type.binary.compare = compareBinary;
Type.map.compare = compareMap;
Type.number.compare = compareNumber;
Type.string.compare = compareString;

Type.bignum.parse = parseBignum;
Type.binary.parse = parseBinary;

function Type() {
  if (!(this instanceof Type)) return new Type();
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
