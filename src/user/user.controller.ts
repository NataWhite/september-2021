import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, Req, UseGuards
} from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthGuard } from "../auth/jwt-auth.guard.";
import { MiddlwareRequestInterface } from "../auth/interface/middlwareRequestInterface.";

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AuthGuard)
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        email: 'example@mail.com',
        name: 'Katya',
        city: 'New York',
        status: true,
        age: 30,
        password: 'qwerty12345',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getOneUserById(@Param('id') id: string) {
    return this.userService.getOneById(id);
  }

  // @HttpCode(HttpStatus.CREATED)
  // @Post()
  // createUser(
  //   // @Req() req: MiddlwareRequestInterface,
  //   @Body() userDto: CreateUserDto) {
  //   // const user = req.user;
  //   return this.userService.createUser(userDto);
  // }


  @Put('/:id')
  updateUser(@Body() userData: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(userData, id);
  }
}
