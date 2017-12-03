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
          it(type + ": " + exam.stringify(type), function() {
            if (!INCLUDE_TYPE[type]) return this.skip();
            var value = exam.getValue(type);
            var buffer = msgpack.encode(value, opt);
            var matched = exam.matchMsgpack(buffer);
            var hint = binary.stringify(buffer) + " !== " + exam.stringify(0);
            assert(matched, hint);
            firstType = type;
          });
        });

        exam.getMsgpacks().forEach(function(encoded) {
          it("msgpack: " + binary.stringify(encoded), function() {
            if (!firstType || EXCLUDE_TYPE[encoded[0]]) return this.skip();
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
