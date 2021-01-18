const winston = require('winston');

const logger = winston.createLogger({
    format:      winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports:  [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({
            filename: 'error.log',
            level:    'error'
        }),
        new winston.transports.File({filename: 'combined.log'}),
    ],
},);

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
module.exports = logger

//             new winston.transports.File({
//                 level:           'info',
//                 filename:        process.cwd() + '/logs/all.log',
//                 handleException: true,
//                 json:            true,
//                 maxSize:         5242880, //5mb
//                 maxFiles:        2,
//                 colorize:        false
//             }), new winston.transports.Console({
//                 level:           'debug',
//                 label:           getFilePath(module),
//                 handleException: true,
//                 json:            false,
//                 colorize:        true
//             })

//  function getFilePath(module) {
//     //using filename in log statements
//     return module.filename.split('/').slice(-2).join('/');
// }
