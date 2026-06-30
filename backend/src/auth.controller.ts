// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';


@Controller('api') // matches your frontend API path
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.usersService.findByUsername(body.username);
    if (!user) {
      throw new UnauthorizedException('admin' +'sijo');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials 2');
    }

    return {
      message: 'Login successful',
      user: { username: user.username },
      token: 'dummy-token', // Replace with JWT later
    };
  }

  @Post('create')
  async create(@Body() body: { name: string; username: string; password: string; confirmPassword: string }) {
    const { name, username, password, confirmPassword } = body;
    console.log(name, username, "aqowqiowqoq");
    if (!name || !username || !password || !confirmPassword) {
      throw new BadRequestException('All fields are required');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      name,
      username,
      password: hashedPassword,
    });

    return {
      message: 'User created successfully',
      user: { username: newUser.username },
    };
  }
}
