#!/usr/bin/env mocha -R spec

var assert = require("assert");
var msgpack = require("msgpack5")();
var Suite = require("../").Suite;
var binary = require("../").Type.binary;

var TITLE = __filename.split("/").pop();

var INCLUDE_TYPE = {
  "array": 1,
  "bignum": 0, // Int64BE not supported
  "binary": 1,
  "bool": 1,
  "map": 1,
  "nil": 1,
  "number": 1,
  "string": 1
};

var EXCLUDE_TYPE = {
  0xdf: 1 // map too big to decode in JS
};

describe(TITLE, function() {
  var suite = new Suite();

  suite.getAllGroup().forEach(function(group) {
    describe(group, function() {

      suite.getAllExam(group).forEach(function(exam) {
        var firstType = 0;

        exam.getAllType().forEach(function(type) {
          var tryIt = INCLUDE_TYPE[type] ? it : it.skip;
          if (INCLUDE_TYPE[type] && !firstType) firstType = type;

          tryIt(type + ": " + exam.stringify(type), function() {
            var value = exam.getValue(type);
            var buffer = msgpack.encode(value);
            var matched = exam.matchMsgpack(buffer);
            var hint = binary.stringify(buffer) + " !== " + exam.stringify(0);
            assert.equal(matched, true, hint);
          });
        });

        exam.getAllMsgpack().forEach(function(encoded) {
          var tryIt = firstType && !EXCLUDE_TYPE[encoded[0]] ? it : it.skip;

          tryIt("msgpack: " + binary.stringify(encoded), function() {
            var value = msgpack.decode(encoded);
            var matched = exam.matchValue(value);
            var hint = JSON.stringify(value) + " !== " + exam.stringify(firstType);
            assert.equal(matched, true, hint);
          });
        });
      });
    });
  });
});
