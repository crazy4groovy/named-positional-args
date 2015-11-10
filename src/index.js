'use strict';
var np = require('named-parameters');

function namedPositionalArgs() {
	var functionArgsRegex = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
		func = this,
		funcArgsPart = func.toString().match(functionArgsRegex)[1];

	var argNamesList = funcArgsPart.split(',').map( function (arg) { return arg.trim() }),
		arg0 = arguments.length === 1 && arguments[0],
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

	var parsed = np.parse(namedArgs);

	parsed.args = function _args () {
		var params = parsed.values();
		var vals = [];
		for (var i = 0, len = argNamesList.length; i < len; i++) {
			var key = argNamesList[i];
			vals[i] = params[key];
		}
		return vals;
	};
	parsed.opts = function _opts () {
		return parsed.values();
	};

	return parsed;
}

if (module && module.exports) {
	module.exports = namedPositionalArgs;
}
