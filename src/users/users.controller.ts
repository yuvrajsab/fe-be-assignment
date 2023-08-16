import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const result = await this.usersService.registerUser(
      registerUserDto.name,
      registerUserDto.email,
      registerUserDto.password,
      registerUserDto.address,
    );

    return {
      id: result.identifiers[0].id,
      name: registerUserDto.name,
      email: registerUserDto.email,
      address: registerUserDto.address,
    };
  }
}
