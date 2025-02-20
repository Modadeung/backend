import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStoreDto } from './dtos/create-store.dto';
import { StoreService } from './store.service';
import { GetStoreDto, GetStoreResponseDto } from './dtos/get-store.dto';
import { CreateUserReservationDto } from './dtos/create-user-reservation.dto';
import { GetStoreDetailResponseDto } from './dtos/get-store-detail.dto';

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
  @ApiOkResponse({
    type: [GetStoreResponseDto],
  })
  @Get('list')
  async getStoreList(@Query() dto: GetStoreDto) {
    return await this.storeService.getStoreList(dto.keywordList);
  }

  @ApiOperation({ summary: '상점 상세' })
  @ApiOkResponse({
    type: GetStoreDetailResponseDto,
  })
  @Get('detail')
  async getStoreDetail(@Query('storeId') storeId: string) {
    return await this.storeService.getStoreDetail(storeId);
  }

  @ApiOperation({ summary: '상점 예약' })
  @Post('reservation')
  async reservationStore(@Body() dto: CreateUserReservationDto) {
    return await this.storeService.reservationStore(dto);
  }
}
