import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { RegisterUserDto, LoginUserDto } from '../dto/user.dto';
import {
  User as UserInterface,
  LoginResponse,
} from '../interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse> {
    try {
      const { password, name, email } = registerUserDto;
      if (!password || !name || !email) {
        throw new NotFoundException('Please Provide Completed Data');
      }

      const userAlreadyExists = await this.userModel.findOne({ email });
      if (userAlreadyExists) {
        throw new NotFoundException('User With This Email Already Exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = {
        ...registerUserDto,
        password: hashedPassword,
      };
      const user = await this.userModel.create(userData);
      const userJwtPayload = { userId: user.id, email: user.email };
      const token = this.jwtService.sign(userJwtPayload);
      return {
        data: {
          user,
          token,
        },
      };
    } catch (err) {
      throw new ConflictException(`Error creating user: ${err.message}`);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse | null> {
    try {
      const { email, password } = loginUserDto;
      if (!email || !password) {
        throw new NotFoundException(`Please Provide Valid Data`);
      }
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException(`user not found`);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new NotFoundException(`invalid password`);
      }
      const userJwtPayload = { id: user.id };
      const token = this.jwtService.sign(userJwtPayload);
      return {
        data: {
          user,
          token,
        },
      };
    } catch (err) {
      throw new ConflictException(`Error updating user: ${err.message}`);
    }
  }
}
