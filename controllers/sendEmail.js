const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const handlebars = require('handlebars')
const path = require('path')
const fs = require('fs');

const sendEmail = async (email, uniqueString, firstName) => {

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        'https://developers.google.com/oauthplayground'
    )

    myOAuth2Client.setCredentials({refresh_token:process.env.GOOGLE_REFRESHTOKEN})

    const accessToken = myOAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'francocaspani.dev@gmail.com',
            type: 'OAuth2',
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const filePath = path.join(__dirname, '../email/verificationMail.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        username: firstName,
        uniqueString: uniqueString
    }
    const htmlToSend = template(replacements)

    let mailOptions = {
        from: 'francocaspani.dev@gmail.com',
        to: email,
        subject: `Hello ${firstName}!`,
        html: htmlToSend
    }

    await transporter.sendMail(mailOptions, function(error, response){
        if (error){
            console.log(error);
        } else {
            console.log(`ckeck ${email} to confirm your account`);
        }
    })
}

module.exports = sendEmail