import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from '../model/reservation.schema';
import { Model } from 'mongoose';
import { Hour, HourDocument } from '../model/hour.schema';
import {
  generateBookingLink,
  genereateInfo,
} from '../utils/mail/genereateInfo';
// import { sendMail } from '../utils/mail/sendMail';
import { MailService } from '../mailer/mailer.service';
@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    @InjectModel(Hour.name)
    private hourModel: Model<HourDocument>,

    private MailService: MailService,
  ) {}

  // Update reservation status to CANCELLED and send mail to user
  async updateReservationStatusAndSendMail(hourID: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
    const isoString = today.toISOString();
    const reservations = await this.reservationModel
      .find({
        ReservationDate: isoString,
        status: 'BOOKED',
        reservationHour: hourID,
      })
      .populate(['userId', 'reservationHour', 'serviceType']);
    for (let i = 0; i < reservations.length; i++) {
      const r: any = reservations[i];
      // Update status to CANCELLED
      // if (r.reservationHour.time < 12 && r.status == 'BOOKED') {
      if (r.status == 'BOOKED') {
        await this.reservationModel.findByIdAndUpdate(r._id, {
          status: 'CANCELLED',
        });
        const context = generateBookingLink(r);
        // await sendMail(context);
        await this.MailService.sendEmail(context);
      }
    }
  }

  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.print();
  // }
  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }
  // @Timeout(5000)
  // handleTimeout() {
  //   // this.logger.debug('Called once after 5 seconds');
  // }

  @Cron('0 10 0 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async remindAppointment() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowISOString = tomorrow.toISOString(); // change to iso string

    const nextDateReservation = await this.reservationModel
      .find({
        ReservationDate: tomorrowISOString,
      })
      .populate(['userId', 'reservationHour', 'serviceType']);

    if (nextDateReservation) {
      for (let i = 0; i < nextDateReservation.length; i++) {
        // create context
        const r: any = nextDateReservation[i];
        const context = genereateInfo(r);
        // console.log(context);
        // send mail
        await this.MailService.sendEmail(context);
      }
    }
  }

  // 9 am
  @Cron('0 0 10 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async updateReservationStatus() {
    await this.updateReservationStatusAndSendMail('63977a90a0b11ef3432af2e6'); // 9 am
  }

  // 10 am
  @Cron('0 0 11 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async updateReservationStatus10() {
    await this.updateReservationStatusAndSendMail('63977aa0828d71477e5dc61a'); // 10 am
  }

  // 11 am
  @Cron('0 0 12 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async updateReservationStatus11() {
    await this.updateReservationStatusAndSendMail('63977aa7665cc78cc533bcdb'); // 11 am
  }

  // 14 pm
  @Cron('0 0 15 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async updateReservationStatus14() {
    await this.updateReservationStatusAndSendMail('63977ab3e6c29e733db06af2'); // 14 pm
  }

  // 15 pm
  @Cron('0 0 16 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async updateReservationStatus15() {
    await this.updateReservationStatusAndSendMail('63977aba8b4c86f32f2a8b6f'); // 15 pm
  }

  // 16 pm
  @Cron('0 0 17 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async updateReservationStatus16() {
    await this.updateReservationStatusAndSendMail('63977ac7cee6af005e150368'); // 16 pm
  }

  // 17 pm
  @Cron('0 0 18 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async updateReservationStatus17() {
    await this.updateReservationStatusAndSendMail('63977acc1b24f6575e48f7b1'); // 17 pm
  }

  // 18 pm
  @Cron('0 0 19 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async updateReservationStatus18() {
    await this.updateReservationStatusAndSendMail('63977ad2799d8ff1b304538f'); // 18 pm
  }

  // 19 pm
  @Cron('0 0 20 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async updateReservationStatus19() {
    await this.updateReservationStatusAndSendMail('63977adb4ea97b0c7d343c81'); // 19 pm
  }

  //   @Cron('0 0 13 * * *', {
  //     timeZone: 'Asia/Ho_Chi_Minh',
  //   })
  //   async updateReservationStatusMorning() {
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
  //     const isoString = today.toISOString();
  //     const reservations = await this.reservationModel
  //       .find({
  //         ReservationDate: isoString,
  //         status: 'BOOKED',
  //         reservationHour: {
  //           $in: [
  //             '63977a90a0b11ef3432af2e6', // 9 am
  //             '63977aa0828d71477e5dc61a', // 10 am
  //             '63977aa7665cc78cc533bcdb', // 11 am
  //           ],
  //         },
  //       })
  //       .populate(['userId', 'reservationHour', 'serviceType']);
  //     for (let i = 0; i < reservations.length; i++) {
  //       const r: any = reservations[i];
  //       // Update status to CANCELLED
  //       if (r.reservationHour.time < 12 && r.status == 'BOOKED') {
  //         await this.reservationModel.findByIdAndUpdate(r._id, {
  //           status: 'CANCELLED',
  //         });
  //         const context = generateBookingLink(r);
  //         await sendMail(context);
  //       }
  //     }
  //   }
  //
  // @Cron('0 0 21 * * *', {
  //   timeZone: 'Asia/Ho_Chi_Minh',
  // }) // run at 21:00
  // async updateReservationStatusEvening() {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
  //   const isoString = today.toISOString();
  //   const reservations = await this.reservationModel
  //     .find({
  //       ReservationDate: isoString,
  //       status: 'BOOKED',
  //       reservationHour: {
  //         $in: [
  //           '63977ab3e6c29e733db06af2', // 14 pm
  //           '63977aba8b4c86f32f2a8b6f', // 15 pm
  //           '63977ac7cee6af005e150368', // 16 pm
  //           '63977acc1b24f6575e48f7b1', // 17 pm
  //           '63977ad2799d8ff1b304538f', // 18 pm
  //           '63977adb4ea97b0c7d343c81', // 19 pm
  //         ],
  //       },
  //     })
  //     .populate(['userId', 'reservationHour', 'serviceType']);
  //   for (let i = 0; i < reservations.length; i++) {
  //     const r: any = reservations[i];
  //     // Update status to CANCELLED
  //     if (r.reservationHour.time < 21 && r.status == 'BOOKED') {
  //       await this.reservationModel.findByIdAndUpdate(r._id, {
  //         status: 'CANCELLED',
  //       });
  //       const context = generateBookingLink(r);
  //       await sendMail(context);
  //     }
  //   }
  // }

  // @Cron('0 */2 * * * *', { timeZone: 'Asia/Ho_Chi_Minh' })
  // async remindAppointmentTest() {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
  //
  //   const tomorrow = new Date(today);
  //   tomorrow.setDate(tomorrow.getDate() + 1);
  //   const tomorrowISOString = tomorrow.toISOString(); // change to iso string
  //
  //   const nextDateReservation = await this.reservationModel
  //     .find({
  //       ReservationDate: tomorrowISOString,
  //     })
  //     .populate(['userId', 'reservationHour', 'serviceType']);
  //
  //   if (nextDateReservation) {
  //     for (let i = 0; i < nextDateReservation.length; i++) {
  //       // create context
  //       const r: any = nextDateReservation[i];
  //       const context = genereateInfo(r);
  //       // console.log(context);
  //       // send mail
  //       await this.MailService.sendEmail(context);
  //     }
  //   }
  // }
}
