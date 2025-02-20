import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStoreDto } from './dtos/create-store.dto';
import { StoreService } from './store.service';
import { GetStoreDto } from './dtos/get-store.dto';

@ApiTags('STORE')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @ApiOperation({ summary: '상점 생성' })
  @Post()
  createStore(@Body() dto: CreateStoreDto) {
    this.storeService.createStore(dto);
  }

  @ApiOperation({ summary: '상점 리스트' })
  @Get('list')
  async getStoreList(@Query() dto: GetStoreDto) {
    console.log(dto.keywordList);
    return await this.storeService.getStoreList(dto.keywordList);
  }
}
