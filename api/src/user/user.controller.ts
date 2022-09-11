import { UserService } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';
import { UserData } from './userData.interface';

// localhost:3000/api/users
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserData | null> {
    return this.userService.findById(id);
  }
}
