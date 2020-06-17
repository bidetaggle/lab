const winston = require('winston');

/*
 *  Common console output
 */

let consoleTransport = new winston.transports.Console({
  level: 'silly',
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
      const {
        timestamp, level, message, ...args
      } = info;

      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    })
  )
})

/*
 *  json format
 */

let jsonTransport = name => new winston.transports.File({
  level: 'silly',
  filename: __dirname + '/logs/' + name + '.json',
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  maxsize: 5242880, //5MB
  maxFiles: 5,
  colorize: false
})

/*
 *  Simple colorized format
 */

let colorizedTransport = name => new winston.transports.File({
  level: 'silly',
  filename: __dirname + '/logs/' + name,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
      const {
        timestamp, level, message, ...args
      } = info;

      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    })
  ),
  maxsize: 5242880, //5MB
  maxFiles: 5,
  colorize: false
})

winston.loggers.add('app', {
  transports: [
    jsonTransport('app'),
    colorizedTransport('app'),
    consoleTransport
  ],
  exitOnError: false
});

winston.loggers.add('adminPanel', {
  transports: [
    jsonTransport('adminPanel'),
    colorizedTransport('adminPanel'),
    consoleTransport
  ],
  exitOnError: false
});
