import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';

import { UserService } from 'src/user/user.service';
import { UserData } from 'src/user/userData.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async signup(user: Readonly<NewUserDTO>): Promise<UserData | any> {
    const { name, email, password } = user;
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) return 'Email already exists';

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create(name, email, hashedPassword);
    return this.userService._getUserData(newUser);
  }
}
