import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, CreateUserResponseDto } from './dtos';
import { UserService } from './user.service';
import {
  CreateUserKeyWordDto,
  CreateUserKeyWordResponseDto,
} from './dtos/create-user-key-word.dto';
import { UpdateUserKeyWordResponseDto } from './dtos/update-user-key-word.dto';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 생성' })
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
  })
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Post('key-word')
  @ApiOperation({ summary: '유저 키워드 생성' })
  async CreateKeyWord(@Body() dto: CreateUserKeyWordDto) {
    return await this.userService.createUserKeyWordList(dto);
  }

  @Get('key-word')
  @ApiOperation({ summary: '유저 키워드 조회' })
  @ApiOkResponse({
    type: CreateUserKeyWordResponseDto,
  })
  async getKeyWord(@Query('userId') userId: string) {
    return await this.userService.getUserKeyWordList(userId);
  }

  @Patch('key-word')
  @ApiOperation({ summary: '유저 키워드 수정' })
  @ApiOkResponse({
    type: UpdateUserKeyWordResponseDto,
  })
  async updateKeyWord(@Body() dto: CreateUserKeyWordDto) {
    return await this.userService.updateUserKeyWordList(dto);
  }
}
