#!/usr/bin/env mocha -R spec

var assert = require("assert");
var Group = require("../").Group;

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

  // count all groups
  var total = Group.getGroups().length;

  Object.keys(INCLUDE_TYPE).forEach(function(type) {
    it(type, function() {
      var opt = {};
      opt[type] = 1;

      // count groups which has exam for specified type
      var count = Group.getGroups().filter(function(group) {
        return group.getExams().filter(function(exam) {
          return exam.getTypes(opt).length;
        }).length;
      }).length;

      assert(count > 0, "each type should have exam groups");

      assert(count < total, "some groups should not have exam for specified type");
    });
  });
});
