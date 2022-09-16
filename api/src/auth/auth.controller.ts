import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';

import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserData } from 'src/user/userData.interface';
import { AuthService } from './auth.service';

// localhost:3000/api/auth
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: NewUserDTO): Promise<UserData | null> {
    return this.authService.signup(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExistingUserDTO): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }

  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  verifyJwt(@Body() payload: { jwt: string }) {
    return this.authService.verifyJwt(payload.jwt);
  }
}
