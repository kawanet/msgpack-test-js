/**
 * Test suite class
 */

exports.Suite = Suite;

var suite = require("msgpack-test-suite");
var Exam = require("./exam").Exam;

function Suite() {
  if (!(this instanceof Suite)) return new Suite();
}

Suite.prototype.getAllExam = getAllExam;
Suite.prototype.getAllGroup = getAllGroup;

function getAllGroup() {
  return Object.keys(suite).sort();
}

function getAllExam(group) {
  var array = suite[group];

  if (!array) throw new Error("Group not found: " + group);

  return array.map(Exam);
}
