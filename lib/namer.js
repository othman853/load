'use strict';

const camelcase = require('camelcase');
const FILE_EXTENSION_REGEX = /[.](.+)?/;

module.exports = {

  solve: (filePath) => {

    if( (filePath === null) || (typeof filePath === 'undefined')){
      throw Error(`${filePath} is an invalid file.`);
    }

    return camelcase(filePath.split('/').slice(-1)[0].replace(FILE_EXTENSION_REGEX, ''));
  }

};
