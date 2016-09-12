const expect = require('chai').expect;
const assert = require('chai').assert;
const chalk = require('chalk');

const path = require('path');

const Module = require(path.join(process.cwd(), 'lib', 'Module'));
const ModuleInjector = require(path.join(process.cwd(), 'lib', 'ModuleInjector'));


describe(chalk.magenta('Blackbox: ModuleInjector'), () => {

  it('Should inject a file as an attribute', (done) => {

    const target = {};

    const modulePack = new Module();
    const injector = new ModuleInjector();

    modulePack.add([
      {path: 'test/unit/_resources/fake-module/fake-file.js'}
    ]);

    injector.inject(modulePack).into(target);

    expect(target).to.have.property('fakeFile');
    assert.typeOf(target.fakeFile, 'function');

    done();
  });

  it.skip('Should inject a folder as an object attribute', (done) => {

    const target = {};

    const modulePack = new Module();
    const injector = new ModuleInjector();

    modulePack.add([
      {path: 'test/unit/_resources/fake-module'}
    ]);

    injector.inject(modulePack).into(target);

    expect(target).to.have.property('fakeModule');
    assert.typeOf(target.fakeFile, 'object');
    expect(target.fakeModule).to.have.property('fakeFile');

    done();

  });

});
