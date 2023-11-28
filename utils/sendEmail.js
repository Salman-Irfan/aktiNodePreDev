const { response } = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const sendEmail = async (email, subject, text)=>{
    try {
        // configuring the nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        // sending email with nodemailer
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log('Email sent successfully')
    } catch (error) {
        console.log('Email not sent')
        console.log(error);
        return response.json({
            error: error.message
        })
    }
}
module.exports = sendEmail