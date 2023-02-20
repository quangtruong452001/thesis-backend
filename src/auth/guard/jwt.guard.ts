import { AuthGuard } from '@nestjs/passport';

// ** 'petstore-jwt' is a string that AuthGuard() will find the corresponding PassportStrategy in jwt.strategy.ts
export class JwtGuard extends AuthGuard('petstore-jwt') {
  constructor() {
    super();
  }
}
