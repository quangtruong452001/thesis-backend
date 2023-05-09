import { ReservationService } from '../reservation/reservation.service';
import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ImageService } from '../image/image.service';
@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly reservationService: ReservationService,
    private readonly imageService: ImageService,
  ) {}

  @Query('users')
  async users() {
    try {
      return this.userService.allUser();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Query('user')
  async user(@Args('id') id: string) {
    try {
      return this.userService.user(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Query('staffs')
  async staffs() {
    try {
      return this.userService.finds({ role: 'staff' });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Mutation('createStaff')
  async createStaff(
    @Args('input') input: any,
    @Args({
      name: 'file',
      type: async () => {
        return (await import('graphql-upload/GraphQLUpload.mjs')).default;
      },
    })
    file,
  ) {
    try {
      if (file.file) {
        const fileUp = await file.file;
        // console.log('fileUp', fileUp);
        const img = await this.imageService.uploadImage(fileUp);
        const image = await this.imageService.createImage(img);
        input.avatar = image.id;
      }

      return this.userService.createStaff(input);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('id') id: string) {
    try {
      return this.userService.deleteUser(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
