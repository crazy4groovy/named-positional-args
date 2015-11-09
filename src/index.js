'use strict';

function namedPositionalArgs() {
	var functionArgsRegex = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
		func = this,
		funcArgsPart = func.toString().match(functionArgsRegex)[1],
		args = funcArgsPart.split(',').map( function (arg) { return arg.trim() }),
		vals = [],
		arg0 = arguments.length === 1 && arguments[0];

	if (arg0 
		&& typeof arg0 === "object"
		&& typeof arg0 !== "function"
		&& !Array.isArray(arg0)
		&& Object.keys(arg0).length > 0) 
	{
		var paramsMap = arg0;
		Object.keys(paramsMap)
			.forEach (function(key) {
				var idx = args.indexOf(key);
				if (idx > -1) {
					vals[idx] = paramsMap[key];
				}
			});
	}
	else {
		for (var i = 0, len = arguments.length; i < len; i++) {
			vals.push(arguments[i]);
		}
	}

	return vals;
}

if (module && module.exports) {
	module.exports = namedPositionalArgs;
}
