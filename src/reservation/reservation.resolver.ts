import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Reservation } from '../model/reservation.schema';
import { ReservationService } from './reservation.service';
import {
  ReservationInput,
  UpdateReservationInput,
} from '../dto/reservation.dto';
import {
  BadRequestException,
  InternalServerErrorException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Resolver('Reservation')
export class ReservationResolver {
  constructor(private reservationService: ReservationService) {}

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

  @Mutation('createReservation')
  @UsePipes(new ValidationPipe())
  async createReservation(
    @Args('reservation') createReservationDto: ReservationInput,
  ) {
    try {
      const reservation = await this.reservationService.create(
        createReservationDto,
      );
      return reservation;
    } catch (error) {
      throw new Error(`Failed to create reservation: ${error.message}`);
    }
  }

  @Mutation('updateReservation')
  @UsePipes(new ValidationPipe())
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
}
