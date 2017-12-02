/**
 * Test data class
 */

exports.Exam = Exam;

var Type = require("./type").Type;

function Exam(src) {
  if (!(this instanceof Exam)) return new Exam(src);
  this.src = src || {};
}

Exam.prototype.getAllMsgpack = getAllMsgpack;
Exam.prototype.getAllType = getAllType;
Exam.prototype.getValue = getValue;
Exam.prototype.matchMsgpack = matchMsgpack;
Exam.prototype.matchValue = matchValue;
Exam.prototype.stringify = stringify;

function getAllType() {
  var src = this.src;

  return Object.keys(src).filter(function(type) {
    return Type[type] instanceof Type;
  });
}

function stringify(idx) {
  var type = Type[idx];
  if (type) {
    return type.stringify(this.src[idx]);
  } else if (idx >= 0) {
    return this.src.msgpack[idx];
  } else {
    return JSON.stringify(this.src);
  }
}

function getValue(type) {
  return Type[type].parse(this.src[type]);
}

function getAllMsgpack() {
  return this.msgpack || (this.msgpack = parseAllMsgpack(this.src));
}

function matchMsgpack(encoded) {
  return this.getAllMsgpack().some(function(check) {
    return Type.binary.compare(encoded, check);
  });
}

function matchValue(value) {
  var that = this;

  return this.getAllType().some(function(type) {
    return Type[type].compare(value, that.getValue(type));
  });
}

function parseAllMsgpack(src) {
  var rows = src && src.msgpack || [];
  return rows.map(Type.binary.parse);
}
