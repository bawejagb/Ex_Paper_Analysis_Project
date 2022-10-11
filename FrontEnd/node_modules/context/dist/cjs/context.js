'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./context.production.js');
} else {
  module.exports = require('./context.development.js');
}