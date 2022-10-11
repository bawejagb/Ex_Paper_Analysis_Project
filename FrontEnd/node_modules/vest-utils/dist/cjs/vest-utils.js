'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./vest-utils.production.js');
} else {
  module.exports = require('./vest-utils.development.js');
}