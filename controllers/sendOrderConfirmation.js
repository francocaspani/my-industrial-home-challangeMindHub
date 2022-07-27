const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const handlebars = require('handlebars')
const path = require('path')
const fs = require('fs');

const sendOrderConfirmation = async (basket, total) => {

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        'https://developers.google.com/oauthplayground'
    )

    myOAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESHTOKEN })

    const accessToken = myOAuth2Client.getAccessToken()
    const templateHTML = () =>{
        let template = ""
        basket.forEach(item =>{
            
                template += `<div
                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
                <!--[if (mso)|(IE)]><td align="center" width="300" style="background-color: #eeeeee;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-50"
                    style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                    <div
                        style="background-color: #eeeeee;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--<![endif]-->
        
                            <table style="font-family:'Rubik',sans-serif;" role="presentation"
                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                    <tr>
                                        <td class="v-container-padding-padding"
                                            style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Rubik',sans-serif;"
                                            align="left">
        
                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                border="0">
                                                <tr>
                                                    <td class="v-text-align"
                                                        style="padding-right: 0px;padding-left: 0px;"
                                                        align="center">
        
                                                        <img align="center" border="0"
                                                            src= ${item.productId.img}
                                                            alt="Model" title="Model"
                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 290px;"
                                                            width="290"
                                                            class="v-src-width v-src-max-width" />
        
                                                    </td>
                                                </tr>
                                            </table>
        
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
        
                            <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                    </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="300" style="background-color: #eeeeee;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                <div class="u-col u-col-50"
                    style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                    <div
                        style="background-color: #eeeeee;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--<![endif]-->
        
                            <table id="u_content_heading_5" style="font-family:'Rubik',sans-serif;"
                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                border="0">
                                <tbody>
                                    <tr>
                                        <td class="v-container-padding-padding"
                                            style="overflow-wrap:break-word;word-break:break-word;padding:33px 10px 0px;font-family:'Rubik',sans-serif;"
                                            align="left">
        
                                            <h1 class="v-text-align v-font-size"
                                                style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Rubik',sans-serif; font-size: 18px;">
                                                <strong>${item.productId.name}</strong>
                                            </h1>
        
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
        
                            <table id="u_content_text_9" style="font-family:'Rubik',sans-serif;"
                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                border="0">
                                <tbody>
                                    <tr>
                                        <td class="v-container-padding-padding"
                                            style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 10px;font-family:'Rubik',sans-serif;"
                                            align="left">
        
                                            <div class="v-text-align"
                                                style="line-height: 170%; text-align: left; word-wrap: break-word;">
                                            
                                            </div>
        
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
        
                            <table id="u_content_heading_6" style="font-family:'Rubik',sans-serif;"
                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                border="0">
                                <tbody>
                                    <tr>
                                        <td class="v-container-padding-padding"
                                            style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 32px;font-family:'Rubik',sans-serif;"
                                            align="left">
        
                                            <h1 class="v-text-align v-font-size"
                                                style="margin: 0px; color: #b96529; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: 'Rubik',sans-serif; font-size: 18px;">
                                                Price: <strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                    &nbsp;$${item.productId.price}</strong>
                                            </h1>
        
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
        
                            <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                    </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>`
            
        })
        return template
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'myindustrialh@gmail.com',
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

    const filePath = path.join(__dirname, '../email/orderConfirmation.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        product: templateHTML(),
        total: total.value,
        shipping: total.breakdown.shipping.value

    }
    const htmlToSend = template(replacements)

    let mailOptions = {
        from: 'myindustrialh@gmail.com',
        to: basket[0].userId.email,
        subject: `Hello ${basket[0].userId.firstName}!`,
        html: htmlToSend
    }

    await transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(`ckeck ${basket[0].userId.email} to confirm your account`);
        }
    })
}

module.exports = sendOrderConfirmation