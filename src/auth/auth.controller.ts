import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignUpAuthDto } from './dto/auth.dto';
import * as csurf from 'csurf';
import { ApiHeader } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('getCsrfToken')
  getCsrfToken(@Request() req): any {
    return {
      token: req.csrfToken(),
    };
  }

  @ApiHeader({
    name: 'X-CSRF-Token',
    description: 'CSRF Token',
  })
  @Post('signup')
  signup(@Body() dto: SignUpAuthDto) {
    return this.authService.signup(dto);
  }

  @ApiHeader({
    name: 'X-CSRF-Token',
    description: 'CSRF Token',
  })
  @Post('signin')
  async signin(@Request() req, @Response() res, @Body() dto: AuthDto) {
    return this.authService.signin(dto, req, res);
  }

  @ApiHeader({
    name: 'X-CSRF-Token',
    description: 'CSRF Token',
  })
  @Get('signout')
  signout(@Request() req, @Response() res) {
    return this.authService.signout(req, res);
  }
}
