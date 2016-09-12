const express = require('express');
const Module = require('Module');
const ModuleInjector = require('ModuleInjector');

const app = express();

const modules = new Module();

modules.add([
  { path: 'routes', process: (app, singleRoute) => app.use(singleRoute) },
  { path: 'models' },
  { path: 'file.js', process: (app, file) => app.use(file)}
]);

const injector = new ModuleInjector();

injector.inject(modules).into(app);
