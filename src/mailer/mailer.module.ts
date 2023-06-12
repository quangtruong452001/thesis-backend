import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';

@Module({
  providers: [MailService],
})
export class MailerModule {}
