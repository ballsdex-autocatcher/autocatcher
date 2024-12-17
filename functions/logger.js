const chalk = require('chalk');
const fs = require('fs')
const path = require('path')
const logLevels = {
    INFO: {
      color: chalk.cyan,
      label: 'INFO',
    },
    SUCCESS: {
        color: chalk.green,
        label: 'SUCCESS',
    },
    WARNING: {
      color: chalk.yellow,
      label: 'WARNING',
    },
    ERROR: {
      color: chalk.red.bold,
      label: 'ERROR',
    },
};
module.exports = class Logger {
    static log(level, message) {
        const { color, label } = logLevels[level] || logLevels.INFO;
        const date = new Date()
        const timestamp = chalk.gray(`[${date.toLocaleString()}]`);
        console.log(`${timestamp} ${color(`[${label}]`)} ${chalk.white(message)}`);
        const logsPath = path.join(__dirname, '../logs')
        if (!fs.existsSync(logsPath)) {
            fs.mkdirSync(logsPath);
        }
        const filename = date.toJSON().slice(0, 10)+'.log'
        const filepath = path.join(logsPath, filename)
        fs.appendFileSync(filepath, `[${date.toLocaleString()}] [${label}] ${message}\n`)

    }
  
    static info(message) {
        Logger.log('INFO', message);
    }
  
    static warning(message) {
        Logger.log('WARNING', message);
    }
  
    static error(message) {
        Logger.log('ERROR', message);
    }
  
    static success(message) {
        Logger.log('SUCCESS', message);
    }
}
