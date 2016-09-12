const path = require('path');
const assert = require('chai').assert;
const Module = require(path.join(process.cwd(), 'lib', 'Module'));
const chalk = require('chalk');

describe(chalk.magenta('Blackbox: Module'), () => {

  it('Should load a single file', (done) => {

    const modulePack = new Module();

    modulePack.add([
      { path: 'example/modules/sample-lib.js' }
    ]);

    assert.equal(modulePack.loadPaths[0].path, path.join(process.cwd(), 'example', 'modules', 'sample-lib.js'));
    assert.isFalse(modulePack.loadPaths[0].isFolder);
    done();
  });

  it.skip('Should not load duplicate files', (done) => {

  });

});
