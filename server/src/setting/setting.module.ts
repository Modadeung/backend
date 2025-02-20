import { Module } from '@nestjs/common';
import { SwaggerService } from './services/swagger.service';

@Module({
  imports: [],
  providers: [SwaggerService],
  exports: [SwaggerService],
})
export class SettingModule {}
