import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt-auth.guard.';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from '../utils/image.filter';

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

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './avatar',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          return cb(null, `${randomName}${file.originalname}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateUser(
    @Body() userData: UpdateUserDto,
    @Param('id') id: string,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    let newAvatarPath: string = null;
    try {
      if (avatar) {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');

        newAvatarPath = `avatar/${randomName}${avatar.originalname}`;
      }

      userData.avatar = newAvatarPath;
      return this.userService.updateUser(userData, id);
    } catch (e) {
      console.log(e);
    }
  }

  @Get('avatar/:image')
  watchFile(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './avatar' });
  }
}

// const randomName = Array(32)
//   .fill(null)
//   .map(() => Math.round(Math.random() * 16).toString(16))
//   .join('');
