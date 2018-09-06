"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "hirebulb.2018@gmail.com",
        pass: "Hirebulb#2018" // generated ethereal password
    }
});
exports.sendEmailFromDb = functions.database.ref("/messages/{pushId}").onCreate((snapShot) => {
    const messageData = snapShot.val();
    console.log(messageData);
    const mailOptions = {
        from: messageData.name + ' <' + messageData.email + '>',
        to: "wired@hirebulb.in",
        bcc: "thnkico@gmail.com",
        subject: messageData.name + "(" + messageData.phone + ") sent an enquiry from Hirebulb contact form",
        text: messageData.message + "\nEmail ID: " + messageData.email + "\nPhone Number: " + messageData.phone
    };
    return transporter.sendMail(mailOptions);
});
//# sourceMappingURL=index.js.map