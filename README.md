# msgpack compatibility test driver

[![Build Status](https://travis-ci.org/kawanet/msgpack-test-js.svg?branch=master)](https://travis-ci.org/kawanet/msgpack-test-js)

This provides a driver to run the msgpack compatibility test suite.

### Synopsis

```js
#!/usr/bin/env mocha -R spec

var assert = require("assert");
var Exam = require("msgpack-test-js").Exam;
var msgpack = require("msgpack-lite");

// set 1 for types to run test
var TEST_TYPES = {
  array: 1,
  bignum: 1,
  binary: 1,
  bool: 1,
  map: 1,
  nil: 1,
  number: 1,
  string: 1
};

describe("msgpack-test-suite", function() {

  // find exams for types supported by the library
  Exam.getExams(TEST_TYPES).forEach(function(exam) {

    // find types tested by the exam
    var types = exam.getTypes(TEST_TYPES);
    var first = types[0];
    var title = first + ": " + exam.stringify(first);
    it(title, function() {

      // test for encoding
      types.forEach(function(type) {
        var value = exam.getValue(type);
        var buffer = msgpack.encode(value, opt);
        assert(exam.matchMsgpack(buffer), exam.stringify(type));
      });

      // test for decoding
      var msgpacks = exam.getMsgpacks();
      msgpacks.forEach(function(encoded, idx) {
        var value = msgpack.decode(encoded, opt);
        assert(exam.matchValue(value), exam.stringify(idx));
      });
    });
  });
});
```

### Test Suite

- [https://github.com/kawanet/msgpack-test-suite](https://github.com/kawanet/msgpack-test-suite)

### GitHub

- [https://github.com/kawanet/msgpack-test-js](https://github.com/kawanet/msgpack-test-js)

### The MIT License (MIT)

Copyright (c) 2017 Yusuke Kawasaki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
