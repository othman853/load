'use strict';

const camelcase = require('camelcase');
const FILE_EXTENSION_REGEX = /[.](.+)?/;

module.exports = {

  solve: (filePath) => camelcase(filePath.split('/').slice(-1)[0].replace(FILE_EXTENSION_REGEX, ''))

};
