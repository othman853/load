'use strict';

const namer = require('./namer.js');

module.exports = class ModuleInjector {

  inject(module) {
    this.module = module;
    return this;
  }

  into(destination) {
    const folders = this.module.loadPaths.filter((path) => path.isFolder);
    const files = this.module.loadPaths.filter((path) => !path.isFolder);

    files.forEach((file) => destination[namer.solve(file.path)] = require(file.path));

    return {
      folders: folders,
      files: files
    }
  }

}
