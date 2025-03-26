const functions = require("firebase-functions");
const admin = require("firebase-admin")
const nodemailer = require('nodemailer');
admin.initializeApp()

// firebase functions:config:set credentials.email=cloudcerebro.dev.09.2020@gmail.com

// firebase functions:config:set credentials.password=
const EMAIL_ADDRESS = functions.config().credentials.email
const PASSWORD = functions.config().credentials.password

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_ADDRESS,
        pass: PASSWORD
    }
});

exports.sendMailOverHTTP = functions.https.onCall((data, context) => {
    return new Promise((resolve, reject) => {

        const mailOptions = {
            from: data.fromEmail,
            to: data.toEmail,
            subject: data.subject,
            html: data.body
        };

        transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log("Error sending email: ", error);
                reject(null);

            }

            var data = JSON.stringify(data)
            resolve(data);
        });
    });
});