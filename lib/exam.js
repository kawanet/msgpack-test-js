/**
 * exam.js
 */

module.exports = Exam;

var Group = require("./group");
var Type = require("./type");

var binary = Type.getType("binary");

function Exam(src) {
  if (!(this instanceof Exam)) return new Exam(src);
  this.src = src || {};
}

Exam.getExams = getExams;

Exam.prototype.getMsgpacks = getMsgpacks;
Exam.prototype.getTypes = getTypes;
Exam.prototype.getValue = getValue;
Exam.prototype.matchMsgpack = matchMsgpack;
Exam.prototype.matchValue = matchValue;
Exam.prototype.stringify = stringify;

function getExams(filter) {
  var array = Group.getGroups().map(function(group) {
    return group.getExams(filter);
  });

  return [].concat.apply([], array);
}

function getTypes(filter) {
  var src = this.src;

  return Object.keys(src).filter(function(type) {
    return !filter || filter[type];
  }).map(function(type) {
    return Type.getType(type);
  }).filter(isTrue);
}

function stringify(idx) {
  // idx is a number
  if (idx >= 0) {
    return this.src.msgpack[idx];
  }

  // idx is a type
  var type = (idx instanceof Type) ? idx : Type.getType(type);
  if (type) {
    return JSON.stringify(this.src[type]);
  }
}

function getValue(type) {
  if (!(type instanceof Type)) type = Type.getType(type);
  return type.parse(this.src[type]);
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
    return type.compare(value, that.getValue(type));
  });
}

function parseAllMsgpack(src) {
  var rows = src && src.msgpack || [];
  return rows.map(binary.parse);
}

function isTrue(v) {
  return v;
}