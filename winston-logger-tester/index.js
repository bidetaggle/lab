require('./logger.js')
const loggerApp = require('winston').loggers.get('app')
const loggerAdmin = require('winston').loggers.get('adminPanel')

loggerApp.info('log for app')
loggerAdmin.info('log for admin panel')

const app = require('./app.js')

app.test()
