const path = require('path');

module.exports = {
  entry: {
    instrument: './instrument.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'mkmidi-instrument.js',
    library: 'mkmidi',
    libraryTarget: 'var'
  }
};
