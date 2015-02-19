// Based on this code: https://github.com/adamwdraper/Numeral-js/blob/master/numeral.js

'use strict';

var merge = require('merge');

var defaultOptions = {
	thousandsDelimeter: '',
	decimalDelimeter: '.',
	roundingFunction: Math.round
};

module.exports = function (number, format, options) {
	return formatNumber(number, format, merge(true, defaultOptions, options));
};

function formatNumber(number, format, opts) {
	var signed = false,
		negative = false;

	var whole = '',
		divisional = '';

	if (format.indexOf('+') > -1) {
		signed = true;
		format = format.replace(/\+/g, '');
	}

	whole = number.toString().split('.')[0];
	var precision = format.split('.')[1];
	var thousands = format.indexOf(',');

	if (precision) {
		if (precision.indexOf('[') > -1) {
			precision = precision.replace(']', '');
			precision = precision.split('[');
			divisional = toFixed(number, (precision[0].length + precision[1].length), opts.roundingFunction, precision[1].length);
		} else {
			divisional = toFixed(number, precision.length, opts.roundingFunction);
		}

		whole = divisional.split('.')[0];

		if (divisional.split('.')[1].length) {
			divisional = opts.decimalDelimeter + divisional.split('.')[1];
		} else {
			divisional = '';
		}

	} else {
		whole = toFixed(number, null, opts.roundingFunction);
	}

	if (whole.indexOf('-') > -1) {
		whole = whole.slice(1);
		negative = true;
	}

	if (thousands > -1) {
		whole = whole.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + opts.thousandsDelimeter);
	}

	if (format.indexOf('.') === 0) {
		whole = '';
	}

	return (negative ? '-' : '') +
	       ((!negative && signed) ? '+' : '') +
	       whole + divisional;
}

function toFixed(value, precision, roundingFunction, optionals) {
	var power = Math.pow(10, precision),
		optionalsRegExp,
		output;

	output = (roundingFunction(value * power) / power).toFixed(precision);

	if (optionals) {
		optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
		output = output.replace(optionalsRegExp, '');
	}

	return output;
}

// console.log(formatNumber(Math.PI, '0.[000]', merge(defaultOptions, null)));
