const path = require('path');
const Module = require(path.join(process.cwd(), 'lib', 'Module'));
const ModuleInjector = require(path.join(process.cwd(), 'lib', 'ModuleInjector'));

const modulePack = new Module();
const injector = new ModuleInjector();

modulePack.add('example/sample-lib.js');
modulePack.add('example');
modulePack.add('/example');

const a = injector.inject(modulePack).into({});

console.log(require('util').inspect(a, { depth: null }));
