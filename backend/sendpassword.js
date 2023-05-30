const nodemailer = require('nodemailer')
const express = require('express')
const router = express.Router()
const db = require('./db')
const mysql = require('mysql2/promise')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

async function sendEmails(emails, passwords) {
  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
          user: '2149637268@qq.com',
          pass: 'fhtjikavgptydieg'
        },
        tls: {
          rejectUnauthorized: false
        }
    })
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i]
      const password = passwords[i]
      const mailOptions = {
        from: '2149637268@qq.com',
        to: email,
        subject: 'Your Password',
        text: `Your password is ${password}`
      }
      const info = await transporter.sendMail(mailOptions)
      console.log(`Email sent to ${email}: ${info.messageId}`)
    }
  } catch (err) {
    console.error('Error sending emails:', err)
  }
}

const emails = ['1735443634@qq.com']
const passwords = ['123456']
sendEmails(emails, passwords)

router.post('/sendpassword', (req, res) => {
  db.
