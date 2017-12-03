/**
 * Test suite class
 */

exports.Suite = Suite;

var suite = require("msgpack-test-suite");
var Exam = require("./exam").Exam;

function Suite() {
  if (!(this instanceof Suite)) return new Suite();
}

Suite.prototype.getExams = getExams;
Suite.prototype.getGroups = getGroups;

function getGroups() {
  return Object.keys(suite).sort();
}

function getExams(group) {
  var array = suite[group];

  if (!array) throw new Error("Group not found: " + group);

  return array.map(Exam);
}
