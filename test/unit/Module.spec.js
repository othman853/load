const path = require('path');
const chalk = require('chalk');
const assert = require('chai').assert;
const expect = require('chai').expect;

const Module = require(path.join('..', '..', 'lib', 'Module'));

describe(chalk.magenta('Unit: Module'), () => {

  it('Should be a function', (done) => {
    expect(Module).to.be.a('function');
    done();

  });

  it('Should load cwd as default root path', (done) => {
    const expectedRootPath = process.cwd();
    const loader = new Module();

    done(assert.equal(loader.rootPath, expectedRootPath));
  });

  it('Should set root path as specified by constructor', (done) => {
    const expectedRootPath = '/tmp';

    const loader = new Module(expectedRootPath);

    done(assert.equal(loader.rootPath, expectedRootPath));
  });

  it('Should add a new file path to the loadPath list', (done) => {
    const loadPath = 'test/unit/_resources/fake-module/fake-file.js';
    const expectedPath = path.join(process.cwd(), loadPath);
    const loader = new Module();

    loader.add([
      { path:loadPath }
    ]);

    done(
      assert.isFalse(loader.loadPaths[0].isFolder) &&
      assert.equal(loader.loadPaths[0].path, expectedPath)
    );

  });

  it('Should add a new folder path to the loadPath list', (done) => {
    const loadPath = 'test/unit/_resources/fake-module';
    const expectedPath = path.join(process.cwd(), loadPath);
    const loader = new Module();

    loader.add([
      {path: loadPath}
    ]);

    done(
      assert.isTrue(loader.loadPaths[0].isFolder) &&
      assert.equal(loader.loadPaths[0].path, expectedPath)
    );
  });

  it('Should not add inexistent files or folders to the loadPath list', (done) => {

    const loadPath = 'WHATEVER_I_DONT_CARE';
    const loader = new Module();

    expect(
      () => loader.add([
        {path:loadPath}
      ])
    )
    .to
    .throw(`Could not load [${path.join(process.cwd(), loadPath)}]. \n Reason: It does not exists`);

    done();
  });

  it('Should add the filter list to the loadPath', (done) => {

    const loadPath = 'test/unit/_resources/fake-module';
    const expectedPath = path.join(process.cwd(), loadPath);
    const expectedFilters = ['.js'];
    const loader = new Module();

    loader.add([
      {
        path: loadPath,
        filters:expectedFilters
      }
    ]);

    assert.equal(loader.loadPaths.length, 1);
    assert.equal(loader.loadPaths[0].path, expectedPath);
    assert.equal(loader.loadPaths[0].filters, expectedFilters);
    done();

  });

  it.skip('Should be file extension insensitive on path loading', (done) => {
    // Should accept both /test/dir/file.js and /test/dir/file
  });

  it.skip('Should allow to add global filters', (done) => {

  });

});
