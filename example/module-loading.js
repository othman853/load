'use strict';

const Module = require('../lib/Module');

const modulePack = new Module();

modulePack.add('example/sample-lib.js');

console.log(require('util').inspect(modulePack, { depth: null }));
