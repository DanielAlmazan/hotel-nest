import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LimpiezaModule } from './limpieza/limpieza.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    LimpiezaModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/hotel'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
