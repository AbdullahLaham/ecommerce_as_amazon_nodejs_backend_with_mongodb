import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

export const sendEmail = asyncHandler(async (data, req, res) => {
      // create reusable transporter object using the default SMTP transport
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'abed26194@gmail.com',
        pass: 'yhryzmbbgicyzdla',
      }

      // host: "smtp.gmail.com",
      // port: 587,
      // secure: false, // true for 465, false for other ports
      
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail(data);
    return info;
  } 
  catch (error) {
    console.log(error.message)
  }
})