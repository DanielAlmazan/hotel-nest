import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LimpiezaModule } from './limpieza/limpieza.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

const dbHost = process.env.DEV_DB_HOST || 'hotelDB';
const dbPort = process.env.DEV_DB_HOST_PORT || '27017';
const devDbName = process.env.DB_NAME || 'hotel';

@Module({
  imports: [
    LimpiezaModule,
    MongooseModule.forRoot(`mongodb://${dbHost}:${dbPort}/${devDbName}`),
    UsuarioModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
