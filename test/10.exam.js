#!/usr/bin/env mocha -R spec

var assert = require("assert");
var Exam = require("../").Exam;

var TITLE = __filename.split("/").pop();

describe(TITLE, function() {
  it("exam.getValue()", function() {
    Exam.getExams().forEach(function(exam) {
      exam.getTypes().forEach(function(type) {
        assert.notEqual(typeof exam.getValue(type), "undefined");
      });
    });
  });

  it("exam.getMsgpacks()", function() {
    Exam.getExams().forEach(function(exam) {
      exam.getMsgpacks().forEach(function(buffer) {
        assert(Buffer.isBuffer(buffer));
        assert(buffer.length);
      });
    });
  });
});
