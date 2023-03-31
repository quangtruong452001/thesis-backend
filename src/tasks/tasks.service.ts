import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from '../model/reservation.schema';
import { Model } from 'mongoose';
import { Hour, HourDocument } from '../model/hour.schema';
import { genereateInfo } from '../utils/mail/genereateInfo';
import { sendMail } from '../utils/mail/sendMail';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,

    @InjectModel(Hour.name)
    private hourModel: Model<HourDocument>,
  ) {}
  // @Cron('45 * * * * *')
  // handleCron() {
  // this.logger.debug('Called when the second is 45');
  // }
  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }
  // @Timeout(5000)
  // handleTimeout() {
  //   // this.logger.debug('Called once after 5 seconds');
  // }

  @Cron('0 10 0 * * *')
  async remindAppointment() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowISOString = tomorrow.toISOString(); // change to iso string

    const nextDateReservation = await this.reservationModel.find({
      ReservationDate: tomorrowISOString,
    });

    if (nextDateReservation) {
      for (let i = 0; i < nextDateReservation.length; i++) {
        // create context
        const r: any = nextDateReservation[i];
        const context = genereateInfo(r);
        // console.log(context);
        // send mail
        await sendMail(context);
      }
    }
  }
}
