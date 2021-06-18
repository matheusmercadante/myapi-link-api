import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DealModule } from '@components/deal/deal.module';
import { OrderModule } from '@components/order/order.module';
import { ConsolidationModule } from '@components/consolidation/consolidation.module';
import { ormConfig } from '@database/config/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    ),
    // TypeOrmModule.forRoot(ormConfig()),
    DealModule,
    OrderModule,
    ConsolidationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
