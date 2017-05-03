'use strict'
const MysqlTools = require('mysql-tools');

const tool = new MysqlTools();

tool.dumpDatabase({
    host: 'localhost',
    user: 'root',
    password: 'a',
    dumpPath: './',
    database: 'remotedb'
}, function (error, output, message, dumpFileName) {
    console.log(error, output, message, dumpFileName)
    let db = './' + dumpFileName
    tool.restoreDatabase({
        host: 'localhost',
        user: 'root',
        password: 'a',
        sqlFilePath: db,
        database: 'destination-db'
    }, function (error, output, message) {
        if (error instanceof Error) {
            console.log(error);
        } else {
            console.log(output);
            console.log(message);
        }
    });
})