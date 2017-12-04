/**
 * Test suite class
 */

module.exports = Group;

var suite = require("msgpack-test-suite");
var Exam = require("./exam");

function Group(name) {
  if (!(this instanceof Group)) return new Group(name);
  this.name = name;
}

Group.getGroups = getGroups;

Group.prototype.getExams = getExams;
Group.prototype.toString = toString;

function getGroups() {
  return Object.keys(suite).sort().map(Group);
}

function getExams(filter) {
  var name = this.name;
  var array = suite[name];

  if (!array) throw new Error("Group not found: " + name);

  return array.map(Exam).filter(function(exam) {
    return !filter || exam.getTypes(filter).length;
  });
}

function toString() {
  return this.name;
}