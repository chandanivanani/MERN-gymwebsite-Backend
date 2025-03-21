import winston,{transports} from "winston";

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.json(),
        winston.format.colorize({ all : true})
    ),
    transports : [
        new transports.Console(),
        new transports.File({
            level: "error",
            filename: "logs/error.log",
        }),
    ],
});

export default logger;
