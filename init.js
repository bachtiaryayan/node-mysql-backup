'use strict'
const MysqlTools = require('mysql-tools');
let schedule = require('node-schedule');
const tool = new MysqlTools();

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yayan.bachtiar@ralali.com',
        pass: 'password'
    }
});

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
                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"yayan" <yayan.bachtiar@ralali.com>', // sender address
                    to: 'abiedoank@gmail.com, yayan.untuk.fb@gmail.com, engineer.diy@ralali.com', // list of receivers
                    subject: '✔ Success backup database ', // Subject line
                    text: '✔ Hello world ?'+message, // plain text body
                    html: '<b>Backup data selesai  ?</b> '+ message // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
            }
        });
    })
});