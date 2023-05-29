import { ReservationService } from '../reservation/reservation.service';
import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ImageService } from '../image/image.service';
import {
  CreateUserDto,
  CreateUserInput,
  UpdateUserDto,
  UpdateUserInput,
} from '../dto/user.dto';
import { GetUser } from '../decorator';
import { MongoIdPipe } from 'src/dto/pipe';
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
  async user(@Args('id', MongoIdPipe) id: string) {
    try {
      return this.userService.user(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Query('getAccount')
  async getAccount(@GetUser() user: any) {
    try {
      const userId = user.id;
      return this.userService.user(userId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @Query('staffs')
  async staffs() {
    try {
      return this.userService.finds({ role: 'STAFF' });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Mutation('createStaff')
  async createStaff(
    @Args('data') input: CreateUserInput,
    @Args({
      name: 'files',
      type: async () => {
        return (await import('graphql-upload/GraphQLUpload.mjs')).default;
      },
    })
    files,
  ) {
    try {
      let avatar;
      console.log('FILES', files);
      for (const file of files) {
        console.log('file', file);
        const fileUp = await file.file;
        console.log('fileUp', fileUp);
        const img = await this.imageService.uploadImage(fileUp);
        const image = await this.imageService.createImage(img);
        avatar = image.id;
      }
      const newInput: CreateUserDto = {
        ...input,
        avatar: avatar,
      };
      console.log(newInput);
      return this.userService.createStaff(newInput);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Mutation('updateUser')
  async updateUser(
    @Args('id', MongoIdPipe) id: string,
    @Args('input') input: UpdateUserInput,
    @Args({
      name: 'files',
      type: async () => {
        return (await import('graphql-upload/GraphQLUpload.mjs')).default;
      },
    })
    files,
  ) {
    try {
      let avatar;
      console.log('FILES', input, id);
      for (const file of files) {
        console.log('file', file);
        const fileUp = await file.file;
        console.log('fileUp', fileUp);
        const img = await this.imageService.uploadImage(fileUp);
        const image = await this.imageService.createImage(img);
        avatar = image.id;
      }
      if (avatar) {
        const newInput: UpdateUserDto = {
          ...input,
          avatar: avatar,
        };
        const user = await this.userService.updateUser(id, newInput);
        return user;
      } else {
        const user = await this.userService.updateUser(id, input);
        return user;
      }
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('id', MongoIdPipe) id: string) {
    try {
      return this.userService.deleteUser(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
