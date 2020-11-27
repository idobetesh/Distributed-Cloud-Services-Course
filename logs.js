const fs = require('fs');
const colors = require('colors');
const moment = require('moment');

const logs = [];
const currTime = () => moment().format('DD-MM-YYYY HH:mm:ss');

const saveToLog = (opObject, isError = false) => {
    const timeStr = currTime();
    const { statusCode: stat, msg: op } = opObject;
    let buff = `${timeStr} -> ${op} | status[${stat}]\n`;

    if (isError) {
        console.error(`${colors.yellow(timeStr)} -> ${colors.red(op)} | ${colors.bgRed(`status [${stat}]`)}`);
    } else {
        console.log(`${colors.yellow(timeStr)} -> ${colors.green(op)} | ${colors.bgGreen(`status [${stat}]`)}`);
    }

    fs.appendFile('logs.txt', buff, (err) => {
        if (err) return console.log(err);
    });

    logs.push(buff.substring(0, buff.length - 1));
}

const getLogs = () => logs;

module.exports = { saveToLog, getLogs }