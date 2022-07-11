import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return this.auth.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async tokenValidate(@Request() req: Req) {
    const token = req.headers.authorization.split(' ')[1];
    return await this.auth.getMe(token);
  }
}
