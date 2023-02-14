import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
  Put,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UpdateUserDto } from './user.dto';
import { UsersService } from './user.service';
import { ApiQuery } from '@nestjs/swagger';
import * as csrf from 'csurf';

const crsfMiddleware = csrf({ cookie: true });

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  getMyUser(@Param() params: { id: string }) {
    return this.usersService.getMyUser(params.id);
  }

  @Put('/:id')
  updateUser(@Param() params: { id: string }, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(params.id, body);
  }

  @Delete('/:id')
  deleteUser(@Param() params: { id: string }) {
    return this.usersService.deleteUser(params.id);
  }

  @Get()
  @ApiQuery({ name: 'search', description: 'search string' })
  @ApiQuery({ name: 'perPage', description: 'limit' })
  @ApiQuery({ name: 'page', description: 'offset' })
  getUsers(@Query() query) {
    return this.usersService.getUsers(query);
  }
}
