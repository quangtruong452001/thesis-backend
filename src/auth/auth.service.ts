import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from '../dto/auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../model/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(authDto: SignUpDto) {
    // ** Generate the password hash
    const hashPassword = await argon.hash(authDto.password);

    try {
      // ** Save the new user in the database
      const createdUser = await this.userModel.create({
        email: authDto.email,
        hashPassword: hashPassword,
        lastName: authDto.lastName,
        firstName: authDto.firstName,
      });

      // ** Send back the token
      return this.signToken(
        createdUser.id,
        createdUser.email,
        createdUser.role,
      );
    } catch (error) {
      throw new ForbiddenException('Credentials taken');
    }
  }

  async signin(authDto: SignInDto) {
    // ** Find the user by email
    const user = await this.userModel.findOne({
      email: authDto.email,
    });

    // ** If user does not exist throw exception
    if (!user) throw new ForbiddenException('Credential incorrect');

    // ** Compare password
    const pwMatches = await argon.verify(user.hashPassword, authDto.password);

    // ** If password is incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credential incorrect');

    // ** Send back the token
    return this.signToken(user.id, user.email, user.role);
  }

  async signToken(
    userId: string,
    email: string,
    role: string,
  ): Promise<object> {
    const payload = {
      sub: userId,
      email,
      role,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h', // ** 24 hours,
      secret: secret,
    });

    const user = await this.userModel.findOne({
      _id: userId,
    });

    return {
      accessToken: token,
      expiredIn: 1,
      user: {
        id: userId,
        email: email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
      },
      statusCode: 200,
    };
  }
}
