import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from '../order/order.service';
import { serviceTypeService } from './serviceType.service';

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
}
