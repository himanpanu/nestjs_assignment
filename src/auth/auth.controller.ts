import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignUpAuthDto } from './dto/auth.dto';
import * as csurf from 'csurf';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('getCsrfToken')
  getCsrfToken(@Request() req): any {
    return {
      token: req.csrfToken(),
    };
  }

  @Post('signup')
  signup(@Body() dto: SignUpAuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Request() req, @Response() res, @Body() dto: AuthDto) {
    return this.authService.signin(dto, req, res);
  }

  @Get('signout')
  signout(@Request() req, @Response() res) {
    return this.authService.signout(req, res);
  }
}
