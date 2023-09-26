"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_PASS, GMAIL_USER } = process.env;

const config = {
  service: "gmail",
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

const createEmail = (recipient) => {
  return {
    to: recipient,
    subject: "Subscribe",
    html: `<div style="background-color: #0A0A11; color: #F3F3F3; padding: 18px; text-align: center;">
    <p>Thank you for subscribing to our newsletter!</p>
    <p>If you didn't request this subscription, you can simply ignore this email.</p>
    <p>Best regards,</p>
    <p>Drink Master</p></div>`,
  };
};

const sendEmail = async (data) => {
  const email = { ...data, from: '"drinkMaster" <noriply@mail.com>' };

  try {
    const info = await transporter.sendMail(email);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createEmail, sendEmail };
