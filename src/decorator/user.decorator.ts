import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtStrategy } from '../auth/strategy';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

export const GetUser = createParamDecorator(
  async (data: string | undefined, context: ExecutionContext) => {
    const config: ConfigService = new ConfigService();
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const jwtStrategy = new JwtStrategy(config);
    const token = req.headers.authorization.split(' ')[1];
    // console.log(jwt.verify(token, config.get('JWT_SECRET')));
    const user = await jwtStrategy.validate(
      jwt.verify(token, config.get('JWT_SECRET')),
    );
    // console.log(user);
    return user;
  },
);
