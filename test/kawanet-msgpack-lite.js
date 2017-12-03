#!/usr/bin/env mocha -R spec

var assert = require("assert");
var msgpack = require("msgpack-lite");
var Suite = require("../").Suite;
var binary = require("../").Type.binary;

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

var EXCLUDE_TYPE = {};

var opt = {codec: msgpack.createCodec({int64: true})};

describe(TITLE, function() {
  var suite = new Suite();

  suite.getGroups().forEach(function(group) {
    describe(group, function() {

      suite.getExams(group).forEach(function(exam) {
        var firstType = 0;

        exam.getTypes().forEach(function(type) {
          var tryIt = INCLUDE_TYPE[type] ? it : it.skip;
          if (INCLUDE_TYPE[type] && !firstType) firstType = type;

          tryIt(type + ": " + exam.stringify(type), function() {
            var value = exam.getValue(type);
            var buffer = msgpack.encode(value, opt);
            var matched = exam.matchMsgpack(buffer);
            var hint = binary.stringify(buffer) + " !== " + exam.stringify(0);
            assert(matched, hint);
          });
        });

        exam.getMsgpacks().forEach(function(encoded) {
          var tryIt = firstType && !EXCLUDE_TYPE[encoded[0]] ? it : it.skip;

          tryIt("msgpack: " + binary.stringify(encoded), function() {
            var value = msgpack.decode(encoded, opt);
            var matched = exam.matchValue(value);
            var hint = JSON.stringify(value) + " !== " + exam.stringify(firstType);
            assert(matched, hint);
          });
        });
      });
    });
  });
});
