const nodemailer = require('nodemailer')
const express = require('express')
const router = express.Router()
const db = require('../db')


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
      //console.log(`Email sent to ${email}: ${info.messageId}`)
    }
  } catch (err) {
    console.error('Error sending emails:', err)
  }
}

// const emails = ['1735443634@qq.com']
// const passwords = ['123456']
// sendEmails(emails, passwords)

router.post('/sendpassword', async (req, res) => {
  try {
    let sql = 'SELECT (email,password) FROM users'
    const { email } = req.body
    if (email) {
      sql = 'SELECT (email,password) FROM user WHERE email = ?', [email]
    }
    const [rows, fields] = await db.query(sql)
    let emails = []
    let passwords = []
    for (let i = 0; i < rows.length; i++) {
      emails.push(rows[i].email)
      passwords.push(rows[i].password)
    }
    sendEmails(emails, passwords)
    res.send(true)

  } catch (err) {
    console.error('not success', err);
    res.status(500).json({ err });
  }
});

module.exports = router