'use strict'
const MysqlTools = require('mysql-tools');
let schedule = require('node-schedule');
const tool = new MysqlTools();

let j = schedule.scheduleJob('59 59 23 * * *', function () {

    tool.dumpDatabase({
        host: 'localhost',
        user: 'root',
        password: 'a',
        dumpPath: './',
        database: 'test-gembus'
    }, function (error, output, message, dumpFileName) {
        console.log(error, output, message, dumpFileName)
        let db = './' + dumpFileName
        tool.restoreDatabase({
            host: 'localhost',
            user: 'root',
            password: 'a',
            sqlFilePath: db,
            database: 'test-backup'
        }, function (error, output, message) {
            if (error instanceof Error) {
                console.log(error);
            } else {
                console.log(output);
                console.log(message);
            }
        });
    })
});