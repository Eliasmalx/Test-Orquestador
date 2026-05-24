import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppDesignModule } from './app-design/app-design.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AppDesignModule,
  ],
})
export class AppModule {}