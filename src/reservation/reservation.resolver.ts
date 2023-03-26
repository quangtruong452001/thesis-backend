import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { Reservation } from '../model/reservation.schema';
import { ReservationService } from './reservation.service';
import {
  ReservationInput,
  UpdateReservationInput,
} from '../dto/reservation.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GetUser } from '../decorator';
import { PubSub } from 'graphql-subscriptions';
import { NotificationService } from '../notification/notification.service';
import { NotificationDto, notificationType } from '../dto/notification.dto';

@Resolver('Reservation')
export class ReservationResolver {
  private pubSub: PubSub;
  constructor(
    private reservationService: ReservationService,
    private notificationService: NotificationService,
  ) {
    this.pubSub = new PubSub();
  }

  @Query('reservations')
  async reservations() {
    try {
      return await this.reservationService.findAll();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve reservations.');
    }
  }

  @Query('reservation')
  async reservation(@Args('id', { type: () => ID }) id: string) {
    try {
      return await this.reservationService.findOne(id);
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid reservation ID');
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }
  @Query('totalReservationSales')
  async getTotal() {
    try {
      return await this.reservationService.getSales();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Query('todayReservations')
  async getTodayReservations() {
    try {
      return await this.reservationService.getTodayReservation();
    } catch (error) {
      console.log(error);
    }
  }
  @Mutation('createReservation')
  // @UsePipes(new ValidationPipe())
  async createReservation(
    @Args('reservation') createReservationDto: ReservationInput,
    @GetUser() user: any,
  ) {
    try {
      // console.log(user);
      createReservationDto.userId = user.id;
      const reservation = await this.reservationService.create(
        createReservationDto,
      );
      if (reservation) {
        const notificationDto: NotificationDto = {
          title: 'You have new reservation',
          type: notificationType.RESERVATION,
          reservationId: reservation._id ? reservation._id : reservation.id,
        };
        const notification = await this.notificationService.create(
          notificationDto,
        );
        // console.log(notification);
        await this.pubSub.publish('newReservationNotification', {
          newReservationNotification: notification,
        });
      }
      return reservation;
    } catch (error) {
      throw new Error(`Failed to create reservation: ${error.message}`);
    }
  }

  @Mutation('updateReservation')
  // @UsePipes(new ValidationPipe())
  async updateReservation(
    @Args('id', { type: () => ID }) id: string,
    @Args('reservation') updateReservationDto: UpdateReservationInput,
  ) {
    try {
      const reservation = await this.reservationService.update(
        id,
        updateReservationDto,
      );
      return reservation;
    } catch (error) {
      throw new Error(`Failed to update reservation: ${error.message}`);
    }
  }

  @Mutation('deleteReservation')
  async deleteReservation(@Args('id', { type: () => ID }) id: string) {
    try {
      const deletedReservation = await this.reservationService.delete(id);
      return deletedReservation;
    } catch (error) {
      throw new Error(`Failed to delete reservation: ${error.message}`);
    }
  }

  @Subscription(
    'newReservationNotification',
    //   , {
    //   filter: (payload, variables) =>
    //     payload.commentAdded.title === variables.title,
    // }
  )
  newReservationNotification() {
    // console.log(this.pubSub.asyncIterator('newNotification'));
    return this.pubSub.asyncIterator('newReservationNotification');
  }
}
