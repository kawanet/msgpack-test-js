#!/usr/bin/env mocha -R spec

var assert = require("assert");
var Group = require("../").Group;
var Exam = require("../").Exam;
var Type = require("../").Type;

var TITLE = __filename.split("/").pop();

var INCLUDE_TYPE = {
  array: 1,
  bignum: 1,
  binary: 1,
  bool: 1,
  map: 1,
  nil: 1,
  number: 1,
  string: 1
};

describe(TITLE, function() {
  var groups;
  var totalExam = 0;
  var typeExam = {};

  it("Group.getGroups()", function() {
    groups = Group.getGroups();
    var c = groups.length;
    assert(c > 0, "the test suite should have some groups");

    groups.forEach(function(group) {
      assert(group instanceof Group);
    });
  });

  it("Exam.getExams()", function() {
    var exams = Exam.getExams();
    totalExam = exams.length;
    assert(totalExam > 0, "the test suite should have some exams");

    exams.forEach(function(exam) {
      assert(exam instanceof Exam);
    });
  });

  Object.keys(INCLUDE_TYPE).forEach(function(type) {
    it('Exam.getExams({' + type + ': 1})', function() {
      var filter = {};
      filter[type] = 1;

      var exams = Exam.getExams(filter);
      var c = typeExam[type] = exams.length;
      assert(c > 0, "the test suite should have some exams for type " + type);

      exams.forEach(function(exam) {
        assert(exam instanceof Exam);
      });
    });
  });

  Object.keys(INCLUDE_TYPE).forEach(function(type) {
    it('Type.getType("' + type + '")', function() {
      var t = Type.getType(type);
      assert(t instanceof Type);
      assert.equal(t + "", type);
    });
  });

  it("group.getExams()", function() {
    var countExam = 0;
    groups.forEach(function(group) {
      group.getExams().forEach(function(exam) {
        assert(exam instanceof Exam);
        countExam++;
      });
    });
    assert.equal(countExam, totalExam, "wrong number of exams found in total");
  });

  Object.keys(INCLUDE_TYPE).forEach(function(type) {
    it('group.getExams({' + type + ': 1})', function() {
      var filter = {};
      filter[type] = 1;
      var countGroup = 0;
      var countExam = 0;

      // count groups which has exam for specified type
      groups.forEach(function(group) {
        var c = group.getExams(filter).length;
        if (c) countGroup++;
        countExam += c;
      });

      assert(countGroup > 0, "each type should have some groups");

      assert(countGroup < groups.length, "some groups should not have exam for specified type");

      assert.equal(countExam, typeExam[type], "wrong number of exams for type " + type);
    });
  });
});
