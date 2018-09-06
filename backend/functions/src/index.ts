import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hirebulb.2018@gmail.com", // generated ethereal user
    pass: "Hirebulb#2018" // generated ethereal password
  }
});

export const sendEmailFromDb = functions.database.ref("/messages/{pushId}").onCreate((snapShot) => {
    const messageData = snapShot.val();
    console.log(messageData)
    const mailOptions = {
        from: messageData.name + ' <'+ messageData.email +'>', // sender address
        to: "wired@hirebulb.in",
        bcc: "thnkico@gmail.com", // list of receivers
        subject: messageData.name + "("+ messageData.phone +") sent an enquiry from Hirebulb contact form", // Subject line
        text: messageData.message + "\nEmail ID: " + messageData.email + "\nPhone Number: "+ messageData.phone
    };
    return transporter.sendMail(mailOptions)
});
