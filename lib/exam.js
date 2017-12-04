/**
 * Test data class
 */

exports.Exam = Exam;

var getType = require("./type").Type.getType;

var binary = getType("binary");

function Exam(src) {
  if (!(this instanceof Exam)) return new Exam(src);
  this.src = src || {};
}

Exam.prototype.getMsgpacks = getMsgpacks;
Exam.prototype.getTypes = getTypes;
Exam.prototype.getValue = getValue;
Exam.prototype.matchMsgpack = matchMsgpack;
Exam.prototype.matchValue = matchValue;
Exam.prototype.stringify = stringify;

function getTypes(filter) {
  var src = this.src;

  return Object.keys(src).filter(function(type) {
    return getType(type);
  }).filter(function(type) {
    return !filter || filter[type];
  });
}

function stringify(idx) {
  var type = getType(idx);
  if (type) {
    return JSON.stringify(this.src[idx]);
  } else if (idx >= 0) {
    return this.src.msgpack[idx];
  } else {
    return JSON.stringify(this.src);
  }
}

function getValue(type) {
  return getType(type).parse(this.src[type]);
}

function getMsgpacks() {
  return this.msgpack || (this.msgpack = parseAllMsgpack(this.src));
}

function matchMsgpack(encoded) {
  return this.getMsgpacks().some(function(check) {
    return binary.compare(encoded, check);
  });
}

function matchValue(value) {
  var that = this;

  return this.getTypes().some(function(type) {
    return getType(type).compare(value, that.getValue(type));
  });
}

function parseAllMsgpack(src) {
  var rows = src && src.msgpack || [];
  return rows.map(binary.parse);
}
