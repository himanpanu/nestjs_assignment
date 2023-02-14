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
import { ApiQuery, ApiHeader, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-Token',
  description: 'CSRF Token',
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiParam({ name: 'id', required: true })
  @Get('/:id')
  getMyUser(@Param() params: { id: string }) {
    return this.usersService.getMyUser(params.id);
  }

  @ApiParam({ name: 'id', required: true })
  @Put('/:id')
  updateUser(@Param() params: { id: string }, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(params.id, body);
  }

  @ApiParam({ name: 'id', required: true })
  @Delete('/:id')
  deleteUser(@Param() params: { id: string }) {
    return this.usersService.deleteUser(params.id);
  }

  @Get('/')
  @ApiQuery({ name: 'search', description: 'search string' })
  @ApiQuery({ name: 'perPage', description: 'limit' })
  @ApiQuery({ name: 'page', description: 'offset' })
  getUsers(@Query() query) {
    console.log(query);
    return this.usersService.getUsers(query);
  }
}
