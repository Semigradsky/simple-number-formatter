'use strict';

var assert = require('assert');
var format = require('./');

describe('Formatter shoul correctly working', function () {

	describe('with', function () {

		it('thousands delimeter', function () {
			assert.equal('10 000', format(10000, '0,0', { thousandsDelimeter: ' ' }));
			assert.equal('10,000', format(10000, '0,0', { thousandsDelimeter: ',' }));
			assert.equal('1,000,000', format(1000000, '0,0', { thousandsDelimeter: ',' }));
		});

		it('decimal delimeter', function () {
			assert.equal('3,14', format(Math.PI, '0.00', { decimalDelimeter: ',' }));
		});

		it('plus sign', function () {
			assert.equal('+10000', format(10000, '+0'));
			assert.equal('-10000', format(-10000, '+0'));
		});

		it('optional fractional', function () {
			assert.equal('10000', format(10000.00001, '0.[0000]'));
			assert.equal('10000.0', format(10000.00001, '0.0[000]'));
			assert.equal('10000.001', format(10000.001, '0.[0000]'));
		});

		it('whole part', function () {
			assert.equal('10000.0000', format(10000, '0.0000'));
			assert.equal('10000', format(10000, '0'));
			assert.equal('', format(10000, '.[0]'));
		});

		it('decimal part', function () {
			assert.equal('3.1416', format(Math.PI, '0.0000'));
			assert.equal('3', format(Math.PI, '0'));
			assert.equal('.14', format(Math.PI, '.[00]'));
		});

		it('rounding function', function () {
			assert.equal('3.1415', format(Math.PI, '0.0000', {
				roundingFunction: Math.floor
			}));
		});

	});

	describe('without', function () {

		it('thousands delimeter', function () {
			assert.equal('10000', format(10000, '0,0')); // default: ''
		});

		it('decimal delimeter', function () {
			assert.equal('3.14', format(Math.PI, '0.00')); // default: '.'
		});

		it('rounding function', function () {
			assert.equal('3.1416', format(Math.PI, '0.0000')); // default: Math.round
		});

	});


});
