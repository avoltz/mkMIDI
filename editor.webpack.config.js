const path = require('path');

module.exports = {
  entry: {
    editor: './editor.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'mkmidi-editor.js',
    library: 'mkmidi',
    libraryTarget: 'var'
  }
};
