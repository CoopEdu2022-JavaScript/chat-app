const nodemailer = require('nodemailer')

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
          rejectUnauthorized: true
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

const emails = ['user1@example.com', 'user2@example.com', 'user3@example.com']
const passwords = ['password1', 'password2', 'password3']
sendEmails(emails, passwords)