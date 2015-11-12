var assert = require('assert');
var namedPositionalArgs = require('../src/index');

describe('namedPositionalArgs', function() {
	describe('all arg values provided', function () {
		function testIt(a, b, c) {
			var ret = namedPositionalArgs.apply(testIt, arguments).args();
			a = ret[0]; b = ret[1]; c = ret[2];

			if (a !== 'a1' || b !== 'b1' || c !== 'c1') // these are the expected values
				throw new Error(`incorrect params detected! ${ret}`);

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
			var ret = namedPositionalArgs.apply(testIt, arguments).args();
			a = ret[0]; b = ret[1]; c = ret[2];

			if (a !== 'a1' || b !== undefined || c !== 'c1') // these are the expected values
				throw new Error(`incorrect params detected! ${ret}`);

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
	describe('arg value - default', function () {
		function testIt(a, b, c) {
			var ret = namedPositionalArgs
				.apply(testIt, arguments)
				.default('b', '55')
				.args();
			a = ret[0]; b = ret[1]; c = ret[2];

			if (a !== 'a1' || b !== '55' || c !== 'c1') // these are the expected values
				throw new Error(`incorrect params detected! ${ret}`);

			return true;
		}

		it('should find/map all args as expected for named args', function () {
			assert.ok(testIt({c: 'c1', a: 'a1'}));
			assert.ok(testIt({a: 'a1', c: 'c1'}));
		});
		it('should find/map all args as expected for positional args', function () {
			assert.ok(testIt('a1', undefined, 'c1'));
			assert.ok(testIt('a1', '55', 'c1'));
		});
	});
	describe('arg value - coerce', function () {
		function testIt(a, b, c) {
			var ret = namedPositionalArgs
				.apply(testIt, arguments)
				.coerce('b', 'boolean')
				.args();
			a = ret[0]; b = ret[1]; c = ret[2];

			if (a !== 'a1' || b !== false || c !== 'c1') // these are the expected values
				throw new Error(`incorrect params detected! ${ret}`);

			return true;
		}

		it('should find/map all args as expected for named args', function () {
			assert.ok(testIt({c: 'c1', a: 'a1'}));
			assert.ok(testIt({a: 'a1', c: 'c1'}));
		});
		it('should find/map all args as expected for positional args', function () {
			assert.ok(testIt('a1', undefined, 'c1'));
			assert.ok(testIt('a1', 0, 'c1'));
		});
	});
	describe('arg value - require/demand', function () {
		function testIt(a, b, c) {
			var ret = namedPositionalArgs
				.apply(testIt, arguments)
				.require('b', 'positive integer')
				.demand('c', 'non-empty string')
				.args();
			a = ret[0]; b = ret[1]; c = ret[2];

			if (a !== 'a1' || b < 0 || c !== 'c1') // these are the expected values
				throw new Error(`incorrect params detected! ${ret}`);

			return true;
		}

		it('should find/map all args as expected for named args', function () {
			assert.ok(testIt({c: 'c1', a: 'a1', b: 1}));
			assert.ok(testIt({a: 'a1', c: 'c1', b: 5}));
		});
		it('should find/map all args as expected for positional args', function () {
			assert.ok(testIt('a1', 1, 'c1'));
			assert.ok(testIt('a1', 5, 'c1'));
		});
		it('should throw for named args', function () {
			assert.throws(function () {
				testIt({c: 'c1', a: 'a1', b: -1});
			});
		});
		it('should throw for positional args', function () {
			assert.throws(function () {
				testIt('a1', -1, 'c1');
			});
		});
	});
	describe('mangled/compressed function args', function () {
		function testIt(a, b, c) { // these got mangled oh my!!
			var ret = namedPositionalArgs
				.apply('x, y, z', arguments) // these were the original args!
				.args();
			a = ret[0]; b = ret[1]; c = ret[2];

			if (a !== 'a1' || b !== 'b1' || c !== 'c1') // these are the expected values
				throw new Error(`incorrect params detected! ${ret}`);

			return true;
		}

		it('should find/map all args as expected for named args', function () {
			assert.ok(testIt({z: 'c1', x: 'a1', y: 'b1'}));  //x, y, z
		});
		it('should find/map all args as expected for positional args', function () {
			assert.ok(testIt('a1', 'b1', 'c1')); //positional still OK
		});
		it('should throw for named args', function () {
			assert.throws(function () {
				testIt({c: 'c1', a: 'a1', b: 'b1'});
			});
		});
	});
});