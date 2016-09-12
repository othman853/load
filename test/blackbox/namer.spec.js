const path = require('path');
const assert = require('chai').assert;
const chalk = require('chalk');
const namer = require(
  path.join(
    process.cwd(),
    'lib',
    'namer'
  )
);

describe(chalk.magenta('Blackbox: namer'), () => {

  it('Should transform /test/whatever/file.js into file', (done) => {
    const filePath = '/test/whatever/file.js';
    const expectedSolvedName = 'file';

    const solvedName = namer.solve(filePath);

    done(
      assert.equal(expectedSolvedName, solvedName)
    );
  });

  it('Should transform /test/whatever/another-file.js into anotherFile.js', (done) => {
    const filePath = '/test/whatever/another-file.js';
    const expectedSolvedName = 'anotherFile';

    const solvedName = namer.solve(filePath);

    done(
      assert.equal(expectedSolvedName, solvedName)
    );
  });

  it('Should transform /test/whatever/another-file.extension.js into anotherFile', (done) => {
    const filePath = '/test/whatever/another-file.extension.js';
    const expectedSolvedName = 'anotherFile';

    const solvedName = namer.solve(filePath);

    done(
      assert.equal(expectedSolvedName, solvedName)
    );
  });

  it.skip('Should treat null cases', (done) => {
    const filePath = null;

    const solvedName = namer.solve(filePath);
    done();
  });

  it.skip('Should treat undefined cases', (done) => {
    const filePath = undefined;

    const solvedName = namer.solve(filePath);
    done();
  });

  it.skip('Should treat cases where path is not valid', (done) => {
    const filePath = 'Something unexpected';

    const solvedName = namer.solve(filePath);
    done(Error('This should be breaking'));

  });

});
