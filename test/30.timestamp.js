#!/usr/bin/env mocha -R spec

var assert = require("assert");
var Exam = require("../").Exam;
var Timestamp = require("timestamp-nano");

var TITLE = __filename.split("/").pop();

var INCLUDE_TYPE = {
  timestamp: 1
};

describe(TITLE, function() {
  var check = {};

  Exam.getExams(INCLUDE_TYPE).forEach(function(exam) {
    exam.getTypes(INCLUDE_TYPE).forEach(function(type) {
      it(exam.stringify(type), function() {

        var ts = exam.getValue(type);
        assert(ts instanceof Timestamp, "it should be a Timestamp");

        var str = ts.toString();
        assert(!check[ts], "each Timestamp should be unique");
        check[str] = 1;

      });
    });
  });
});
