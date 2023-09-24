"use strict";
const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_PASS, GMAIL_USER, BASE_URL } = process.env;

const config = {
  service: "gmail",
  secure: true,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

const createEmail = (recipient, userId) => {
  return {
    to: recipient,
    subject: "Subscribe",
    html: `<a target="_blank" href="${BASE_URL}/users/subscribe/${userId}">Click to Subscribe</a>`,
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
