import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from '../users/dto/users.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorators';
import { Role } from 'src/auth/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard, RolesGuard) // Todos excepto POST (signup) están protegidos
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  getUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<Omit<User, 'password'>[]> {
    return this.usersService.getUsers(Number(page), Number(limit));
  }

  @Get(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.getUserByIdWithOrders(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.updateUserSafe(id, user);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<{ id: string }> {
    return this.usersService.deleteUserAndReturnId(id);
  }
}
