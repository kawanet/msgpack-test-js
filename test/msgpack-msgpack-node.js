#!/usr/bin/env mocha -R spec

var assert = require("assert");
var msgpack = require("msgpack");
var Suite = require("../").Suite;
var binary = require("../").Type.binary;

var TITLE = __filename.split("/").pop();

var INCLUDE_TYPE = {
  array: 1,
  bignum: 0, // Int64BE not supported
  binary: 0, // bin type not supported?
  bool: 1,
  map: 1,
  nil: 1,
  number: 1,
  string: 1
};

var EXCLUDE_TYPE = {
  // nothing
};

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
            var buffer = msgpack.pack(value);
            var matched = exam.matchMsgpack(buffer);
            var hint = binary.stringify(buffer) + " !== " + exam.stringify(0);
            assert(matched, hint);
            firstType = type;
          });
        });

        exam.getMsgpacks().forEach(function(encoded) {
          it("msgpack: " + binary.stringify(encoded), function() {
            if (!firstType || EXCLUDE_TYPE[encoded[0]]) return this.skip();
            var value = msgpack.unpack(encoded);
            var matched = exam.matchValue(value);
            var hint = JSON.stringify(value) + " !== " + exam.stringify(firstType);
            assert(matched, hint);
          });
        });
      });
    });
  });
});
