import { google } from 'googleapis';
import nodemailer, { TransportOptions } from 'nodemailer';
const CLIENT_ID =
  '95919188152-vvksvjvbafh5p0lfp03go6fv9ri743ko.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04ZEWjbvK6q8CCgYIARAAGAQSNwF-L9Irl5jRDt40SseOfiGgXunmVlWheCTyqX1pEJ1JF-trfwcndfD-NTupcRjZxrEIx-XqOMA';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendMail = async (context: any) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      // host: 'smtp.gmail.com',
      // port: 465,
      // secure: true,
      auth: {
        type: 'OAuth2',
        user: 'nhuv5576@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
      debug: true,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    } as TransportOptions);

    const info = await transporter.sendMail(context);

    console.log('Message sent: ', info);
  } catch (error) {
    console.log(error.message);
  }
};
