const loggerApp = require('winston').loggers.get('app')

exports.test = () => {
  loggerApp.warn('application')
}
