import winston, { level } from 'winston'

const colors = {
    http: 'magenta',
}

const colorizer = winston.format.colorize()
colorizer.addColors(colors)

const options: winston.LoggerOptions = {
    format: winston.format.combine(
        winston.format.printf(info =>
            colorizer.colorize(info.level, `[ ${info.level.toUpperCase()} ] ${info.message}`)
        )
    ),
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
        }),
        new winston.transports.File({ filename: 'debug.log', level: 'debug' })
    ]
}

const logger = winston.createLogger(options)

if (process.env.NODE_ENV !== 'production') {
    logger.debug('Logging initialized at debug level')
}

export default logger
