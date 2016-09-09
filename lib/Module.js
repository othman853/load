'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

module.exports = class ModuleLoad {

  constructor(nonDefaultRootPath) {
    this.rootPath = nonDefaultRootPath || process.cwd();
    this.loadPaths = [];
  }

  add(_loadPath, filters) {

    const loadPath = path.join(this.rootPath, _loadPath);

    if (!fs.existsSync(loadPath)) {
      throw Error(chalk.red(`Could not load [${_loadPath}] under [${this.rootPath}]. \n Reason: It does not exists`));
    }

    this.loadPaths.push({
      isFolder: fs.lstatSync(loadPath).isDirectory(),
      path: path.join(loadPath),
      filters: filters || []
    });

    console.log(chalk.green(`[MODULE-INFO]: ${_loadPath} loaded.`));

    return this;
  }

}
