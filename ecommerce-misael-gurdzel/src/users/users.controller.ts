// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   ParseUUIDPipe,
//   Put,
//   Query,
//   UseGuards,
//   //UseGuards,
// } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { UpdateUserDto } from './dto/users.dto';
// import { AuthGuard } from 'src/auth/guards/auth.guard';
// import { Roles } from 'src/decorators/roles.decorators';
// import { Role } from 'src/auth/roles.enum';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { ApiBearerAuth } from '@nestjs/swagger';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @ApiBearerAuth()
//   @Get()
//   @Roles(Role.Admin) //*'admin'
//   @UseGuards(AuthGuard, RolesGuard)
//   getUsers(@Query('page') page?: number, @Query('limit') limit?: number) {
//     //*si se envian:
//     if (page && limit) {
//       return this.usersService.getUsers(Number(page), Number(limit));
//     }
//     //* si no se envian:
//     else {
//       return this.usersService.getUsers(1, 10); // Default to page 1 and limit 10
//     }
//   }

//   @ApiBearerAuth()
//   @Get(':id')
//   @UseGuards(AuthGuard)
//   getUser(@Param('id', ParseUUIDPipe) id: string) {
//     return this.usersService.getUserById(id);
//   }

//   //* POST localhost/users
//   // @HttpCode(201)
//   // @Post()
//   // addUser(@Body() user: CreateUserDto) {
//   //   return this.usersService.addUser(user);
//   // }

//   @ApiBearerAuth()
//   @Put('id')
//   @UseGuards(AuthGuard)
//   updateUser(
//     @Param('id', ParseUUIDPipe) id: string,
//     @Body() user: UpdateUserDto,
//   ) {
//     return this.usersService.updateUser(id, user);
//   }

//   @ApiBearerAuth()
//   @Delete(':id')
//   @UseGuards(AuthGuard)
//   deleteUser(@Param('id') id: string) {
//     return this.usersService.deleteUser(id);
//   }
// }

import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<User[]> {
    return this.usersService.getUsers(Number(page), Number(limit));
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
