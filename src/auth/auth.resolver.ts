import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { SignInDto, SignUpDto } from '../dto/auth.dto';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // sign in
  @Mutation('signIn')
  @UsePipes(new ValidationPipe())
  async signIn(@Args('input') input: SignInDto) {
    return this.authService.signin(input);
  }

  // sign up
  @Mutation('signUp')
  // @UsePipes(new ValidationPipe())
  async signUp(@Args('input') input: SignUpDto) {
    return this.authService.signup(input);
  }
}
