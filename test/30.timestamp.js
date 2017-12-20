#!/usr/bin/env mocha -R spec

var assert = require("assert");
var Exam = require("../").Exam;
var MsgTimestamp = require("msg-timestamp").MsgTimestamp;

var TITLE = __filename.split("/").pop();

var INCLUDE_TYPE = {
  timestamp: 1
};

describe(TITLE, function() {
  var check = {};

  Exam.getExams(INCLUDE_TYPE).forEach(function(exam) {
    exam.getTypes(INCLUDE_TYPE).forEach(function(type) {
      it(exam.stringify(type), function() {

        var msg = exam.getValue(type);
        assert(msg instanceof MsgTimestamp, "it should be a Timestamp");

        var str = msg.toString();
        assert(!check[msg], "each Timestamp should be unique");
        check[str] = 1;
      });
    });
  });
});
