# Number formatter [![Build Status](https://travis-ci.org/Semigradsky/simple-number-formatter.svg)](https://travis-ci.org/Semigradsky/simple-number-formatter) [![Dependency Status](https://david-dm.org/Semigradsky/simple-number-formatter.svg)](https://david-dm.org/Semigradsky/simple-number-formatter)

> Format number to string by pattern.


## Install

```sh
$ npm install --save simple-number-formatter
```


## Usage

`format(number, pattern, options)`

```js
var format = require('simple-number-formatter');

format(0.23, '0.00000');
//=> '0.23000'

format(0.23, '0.0[0000]');
//=> '0.23'

format(10000.001, '0.[00]');
//=> '10000'

format(10000.23, '+0,0', { thousandsDelimeter: ',' });
//=> '+10,000'

format(-0.23, '.00')
//=> -.23

format(Math.PI, '0.0000')
//=> '3.1416'

format(Math.PI, '0.0000', {
	roundingFunction: Math.floor
});
//=> '3.1415'

```

See tests for more details.

### Available options

thousandsDelimeter // default: ''

decimalDelimeter   // default: '.'

roundingFunction   // default: Math.round


## License

MIT © Dmitry Semigradsky
