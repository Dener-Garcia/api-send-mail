const nodemailer = require('nodemailer')

const nodemailerConfig = (emailName, emailPassword) => {
    console.log(emailName, emailPassword)
    const configSmtp = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
          user: emailName,
          pass: emailPassword
        }
      });

      return configSmtp

} 

const nodemailerEmailOptions = (from, to, bcc, subject, html, files) => {
    const mailOptions = {
        from: from,
        to: to,
        bcc: bcc,
        subject: subject,
        html: html,
        attachments: files
    };

    return mailOptions
}

module.exports = {
    nodemailerConfig,
    nodemailerEmailOptions
}