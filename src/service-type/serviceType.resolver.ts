import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { serviceTypeService } from './serviceType.service';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ServiceTypeInput,
  UpdateServiceTypeInput,
} from '../dto/serviceType.dto';
import { GetUser } from '../decorator';

@Resolver('ServiceType')
export class ServiceTypeResolver {
  constructor(private readonly serviceTypeService: serviceTypeService) {}

  @Query('serviceTypes')
  async serviceTypes() {
    try {
      const data = await this.serviceTypeService.findAll();
      return data;
    } catch (e) {
      throw e;
      console.log(e);
    }
  }

  @Query('serviceType')
  async serviceType(@Args('id', { type: () => ID }) id: string) {
    try {
      return await this.serviceTypeService.findOne(id);
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid service ID');
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }
  @Query('recommendService')
  async getRecommend(@GetUser() user: any) {
    try {
      const userId = user.id;
      return this.serviceTypeService.recommendServiceType(userId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Mutation('createServiceType')
  async createServiceType(
    @Args('serviceType') createServiceTypeDto: ServiceTypeInput,
  ) {
    try {
      const service = await this.serviceTypeService.create(
        createServiceTypeDto,
      );
      return service;
    } catch (error) {
      throw new Error(`Failed to create service: ${error.message}`);
    }
  }

  @Mutation('updateServiceType')
  async updateServiceType(
    @Args('id', { type: () => ID }) id: string,
    @Args('serviceType') updateServiceTypeDto: UpdateServiceTypeInput,
  ) {
    try {
      const service = await this.serviceTypeService.update(
        id,
        updateServiceTypeDto,
      );
      return service;
    } catch (error) {
      throw new Error(`Failed to update service: ${error.message}`);
    }
  }

  @Mutation('deleteServiceType')
  async deleteServiceType(@Args('id', { type: () => ID }) id: string) {
    try {
      const deletedServiceType = await this.serviceTypeService.delete(id);
      return deletedServiceType;
    } catch (error) {
      throw new Error(`Failed to delete serviceType: ${error.message}`);
    }
  }
}
