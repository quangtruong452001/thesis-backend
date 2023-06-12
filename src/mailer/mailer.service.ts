import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { TransportOptions } from 'nodemailer';

const CLIENT_ID =
  '95919188152-vvksvjvbafh5p0lfp03go6fv9ri743ko.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04HCQNa4z9FNPCgYIARAAGAQSNwF-L9Ir0v6GRhtf5lw5hFh8Up2JjTygBqffeYGJ0g8M4-0vY7TTqcHFl0MX7h-cx8Znc0iLOFY';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // const mailConfig = this.configService.get('mail');
  }

  async sendEmail(context: any) {
    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI,
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    this.transporter = nodemailer.createTransport({
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
    const info = await this.transporter.sendMail(context);
    console.log('Message sent: ', info);
  }
}
