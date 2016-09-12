'use strict';

const Module = require('../lib/Module');

const modulePack = new Module();

modulePack.add([
  {path: 'example/modules/sample-lib.js'},
  {path: 'example'},
  {path: '/example'},
]);

console.log(require('util').inspect(modulePack, { depth: null }));
