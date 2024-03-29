import morgan from "morgan"
import logger from "../logger"

const stream = {
    // Use the http severity
    write: (message: string) => logger.http(message),
}

const skip = () => {
    const env = process.env.NODE_ENV || "development"
    return env !== "development"
}

const morganMiddleware = morgan(
    // Define message format string.
    // The message format is made from tokens, and each token is defined inside the Morgan library.
    // You can create your custom token to show what do you want from a request.
    ":remote-addr :method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
)

module.exports = morganMiddleware
export default morganMiddleware
