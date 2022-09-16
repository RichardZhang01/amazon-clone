import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';

import { UserService } from 'src/user/user.service';
import { UserData } from 'src/user/userData.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async signup(user: Readonly<NewUserDTO>): Promise<UserData | any> {
    const { name, email, password } = user;
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser)
      throw new HttpException(
        'An account with that email already exists.',
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create(name, email, hashedPassword);
    return this.userService._getUserData(newUser);
  }

  async isSamePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserData | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.isSamePassword(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return this.userService._getUserData(user);
  }

  async login(
    existingUser: ExistingUserDTO,
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new HttpException('Invalid credentials.', HttpStatus.UNAUTHORIZED);

    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
