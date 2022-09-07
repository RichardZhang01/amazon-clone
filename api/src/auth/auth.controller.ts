import { Body, Controller, Post } from '@nestjs/common';

import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserData } from 'src/user/userData.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: NewUserDTO): Promise<UserData | null> {
    return this.authService.signup(user);
  }
}
