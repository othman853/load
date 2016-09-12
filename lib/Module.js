'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

module.exports = class ModuleLoad {

  constructor(nonDefaultRootPath) {
    this.rootPath = nonDefaultRootPath || process.cwd();
    this.loadPaths = [];
  }

  _toLoadPath(partialPath) {

    partialPath.path = path.join(this.context.rootPath, partialPath.path);

    if (fs.existsSync(partialPath.path)) {
      return {
        isFolder: fs.lstatSync(partialPath.path).isDirectory(),
        path: partialPath.path,
        process: partialPath.process,
        filters: partialPath.filters || []
      };
    }

    throw Error(chalk.red(`Could not load [${partialPath.path}]. \n Reason: It does not exists`));

  }

  add(paths) {
    this.loadPaths = this.loadPaths.concat(paths.map(this._toLoadPath.bind({context:this})));
    return this;
  }

}
