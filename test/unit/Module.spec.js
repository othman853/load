const path = require('path');
const chalk = require('chalk');
const chai = require('chai');
const spies = require('chai-spies');
const assert = chai.assert;
const expect = chai.expect;

chai.use(spies);

const Module = require(path.join('..', '..', 'lib', 'Module'));

describe(chalk.magenta('Unit: Module'), () => {

  describe(chalk.magenta('Unit: Module: Structure'), () => {
    it('Should be a function', (done) => {
      expect(Module).to.be.a('function');
      done();

    });
  });

  describe(chalk.magenta('Unit: Module: rootPath'), () => {

    it('Should load cwd as default root path', (done) => {
      const expectedRootPath = process.cwd();
      const modulePack = new Module();

      done(assert.equal(modulePack.rootPath, expectedRootPath));
    });

    it('Should set root path as specified by constructor', (done) => {
      const expectedRootPath = '/tmp';

      const modulePack = new Module(expectedRootPath);

      done(assert.equal(modulePack.rootPath, expectedRootPath));
    });
  });

  describe(chalk.magenta('Unit: Module: add'), () => {

    it('Should not accept strings on add call', (done) => {
      const modulePack = new Module();
      const invalidString = 'whatever';
      expect ( () => modulePack.add(invalidString)).to.throw(`Invalid path list: ${invalidString} It should be an Array.`);
      done();
    });

    it('Should not accept numbers on add call', (done) => {
      const modulePack = new Module();
      const invalidNumber = 123;
      expect ( () => modulePack.add(invalidNumber)).to.throw(`Invalid path list: ${invalidNumber} It should be an Array.`);
      done();
    });

    it('Should not accept null on add call', (done) => {
      const modulePack = new Module();
      const invalidNull = null;
      expect ( () => modulePack.add(invalidNull)).to.throw(`Invalid path list: ${invalidNull} It should be an Array.`);
      done();
    });

    it('Should not accept undefined on add call', (done) => {
      const modulePack = new Module();
      const invalidUndefined = undefined;
      expect ( () => modulePack.add(invalidUndefined)).to.throw(`Invalid path list: ${invalidUndefined} It should be an Array.`);
      done();
    });

    it('Should not accept object on add call', (done) => {
      const modulePack = new Module();
      expect ( () => modulePack.add({})).to.throw('Invalid path list: [object Object] It should be an Array.');
      done();
    });

    it('Should ignore empty array on add call', (done) => {
      const modulePack = new Module();
      chai.spy.on(modulePack.loadPaths, 'concat');
      modulePack.add([]);

      expect(modulePack.loadPaths.concat).to.not.have.been.called();
      done();
    });

    it('Should not accept objects that do not contain path attribute', (done) => {
      const modulePack = new Module();
      expect ( () => modulePack.add([{}])).to.throw('One of the specified module paths are invalid.');
      done();
    });

    it.skip('Should accept an array with an object containing at least the path attribute on add call', (done) => {
      const modulePack = new Module();

      modulePack.add([
        { path: 'abc' }
      ]);

      done();

    });

    it.skip('Path attribute received in object of array should be a string on add call', (done) => {
      const modulePack = new Module();

      modulePack.add([
        { path: 'abc' }
      ]);

    });

    it('Should add a new file path to the loadPath list', (done) => {
      const loadPath = 'test/unit/_resources/fake-module/fake-file.js';
      const expectedPath = path.join(process.cwd(), loadPath);
      const modulePack = new Module();

      modulePack.add([
        { path:loadPath }
      ]);

      done(
        assert.isFalse(modulePack.loadPaths[0].isFolder) &&
        assert.equal(modulePack.loadPaths[0].path, expectedPath)
      );

    });

    it('Should add a new folder path to the loadPath list', (done) => {
      const loadPath = 'test/unit/_resources/fake-module';
      const expectedPath = path.join(process.cwd(), loadPath);
      const modulePack = new Module();

      modulePack.add([
        {path: loadPath}
      ]);

      done(
        assert.isTrue(modulePack.loadPaths[0].isFolder) &&
        assert.equal(modulePack.loadPaths[0].path, expectedPath)
      );
    });

    it('Should not add inexistent files or folders to the loadPath list', (done) => {

      const loadPath = 'WHATEVER_I_DONT_CARE';
      const modulePack = new Module();

      expect(
        () => modulePack.add([
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
      const modulePack = new Module();

      modulePack.add([
        {
          path: loadPath,
          filters:expectedFilters
        }
      ]);

      assert.equal(modulePack.loadPaths.length, 1);
      assert.equal(modulePack.loadPaths[0].path, expectedPath);
      assert.equal(modulePack.loadPaths[0].filters, expectedFilters);
      done();

    });

    it.skip('Should be file extension insensitive on path loading', (done) => {
      // Should accept both /test/dir/file.js and /test/dir/file
    });

    it.skip('Should allow to add global filters', (done) => {

    });

  });

});
