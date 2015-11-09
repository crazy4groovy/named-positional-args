var assert = require('assert');
var namedPositionalArgs = require('../src/index');

describe('namedPositionalArgs', function() {
	describe('all arg values provided', function () {
		function testIt(a, b, c) {
			var ret = namedPositionalArgs.apply(testIt, arguments);
			a = ret[0]; b = ret[1]; c = ret[2];

			if (a !== 'a1' || b !== 'b1' || c !== 'c1') // these are the expected values
				throw new Error ('incorrect params detected!');

			return true;
		}

		it('should find/map all args as expected for named args', function () {
			assert.ok(testIt({c: 'c1', a: 'a1', b: 'b1'}));
			assert.ok(testIt({c: 'c1', b: 'b1', a: 'a1'}));
			assert.ok(testIt({b: 'b1', c: 'c1', a: 'a1'}));
		});

		it('should find/map all args as expected for positional args', function () {
			assert.ok(testIt('a1', 'b1', 'c1'));
		});
	});
	describe('missing/undefined arg value', function () {
		function testIt(a, b, c) {
			var ret = namedPositionalArgs.apply(testIt, arguments);
			a = ret[0]; b = ret[1]; c = ret[2];

			if (a !== 'a1' || b !== undefined || c !== 'c1') // these are the expected values
				throw new Error ('incorrect params detected!');

			return true;
		}

		it('should find/map all args as expected for named args', function () {
			assert.ok(testIt({c: 'c1', a: 'a1'}));
			assert.ok(testIt({a: 'a1', c: 'c1'}));
		});

		it('should find/map all args as expected for positional args', function () {
			assert.ok(testIt('a1', undefined, 'c1'));
		});
	});
});