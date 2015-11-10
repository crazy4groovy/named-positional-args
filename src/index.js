'use strict';
var np = require('named-parameters');

var argNamesList = [],
	namedArgs = {},
	arg0,
	parsed;

function namedPositionalArgs() {
	var functionArgsRegex = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
		func = this,
		funcArgsPart = func.toString().match(functionArgsRegex)[1];

	argNamesList = funcArgsPart.split(',').map( function (arg) { return arg.trim() });
	arg0 = arguments.length === 1 && arguments[0];
	namedArgs = {};

	if (arg0
		&& typeof arg0 === "object"
		&& typeof arg0 !== "function"
		&& typeof arg0.now !== "function"
		&& !Array.isArray(arg0)
		&& Object.keys(arg0).length > 0)
	{
		// named args were passed in
		namedArgs = arg0;
	}
	else {
		// positional args were passed in
		for (var i = 0, len = arguments.length; i < len; i++) {
			namedArgs[argNamesList[i]] = arguments[i];
		}
	}

	parsed = np.parse(namedArgs);

	return namedPositionalArgs;
}

namedPositionalArgs.default = function _default () {
	parsed = parsed.default.apply(parsed, arguments);
	return namedPositionalArgs;
}

namedPositionalArgs.coerce = function _coerce () {
	parsed = parsed.coerce.apply(parsed, arguments);
	return namedPositionalArgs;
}

namedPositionalArgs.require = function _require () {
	parsed = parsed.require.apply(parsed, arguments);
	return namedPositionalArgs;
}

namedPositionalArgs.args = function _values () {
	var params = parsed.values();
	var vals = [];
	for (var i = 0, len = argNamesList.length; i < len; i++) {
		var key = argNamesList[i];
		vals[i] = params[key];
	}
	return vals;
}

namedPositionalArgs.opts = function _opts () {
	return parsed.values();
}

if (module && module.exports) {
	module.exports = namedPositionalArgs;
}
