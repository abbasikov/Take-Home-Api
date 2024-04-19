import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterUserDto, LoginUserDto } from '../dto/user.dto';

@Controller('api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() registerUserDto: RegisterUserDto) {
    try {
      return this.userService.register(registerUserDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    try {
      return this.userService.login(loginUserDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
