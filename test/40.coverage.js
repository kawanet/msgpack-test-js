#!/usr/bin/env mocha -R spec

var assert = require("assert");
var Group = require("../").Group;
var Exam = require("../").Exam;
var Type = require("../").Type;

var TITLE = __filename.split("/").pop();

describe(TITLE, function() {
  it("call constructor withoue 'new'", function() {
    assert(Group() instanceof Group, "Group() without 'new' should return Group");

    assert(Exam() instanceof Exam, "Exam() without 'new' should return Exam");

    assert(Type() instanceof Type, "Type() without 'new' should return Type");
  });

  it("group.getExams()", function() {
    try {
      Group("INVALID_GROUP_NAME").getExams();
    } catch (e) {
      return assert(e);
    }
    assert(false, "it should throw an error");
  });

  it("exam.getMsgpack()", function() {
    assert.equal(Exam().getMsgpacks().length, 0, "should be empty");
  });

  it("exam.getValue()", function() {
    assert.equal(Exam({number: 1}).getValue("number"), 1);
  });

  it("bignum.parse()", function() {
    var bignum = Type.getType("bignum");
    assert.equal(bignum.parse("65535"), 65535);
    assert.equal(bignum.parse("0xFFFF"), 65535);
  });

  it("map.compare()", function() {
    var map = Type.getType("map");
    var a = [1];
    var b = [1];
    var c = [2, 3];
    var d = [4];
    assert(map.compare(a, b));
    assert(!map.compare(a, c));
    assert(!map.compare(a, d));
  });

  it("exam.getMsgpack()", function() {
    var exams = Exam.getExams({ext: 1});
    assert(exams.length);
    var ext = Type.getType("ext");
    var buffer = exams[0].getValue(ext);
    assert(ext.compare(buffer, buffer));
    assert(!ext.compare(buffer, null));
  });
});
