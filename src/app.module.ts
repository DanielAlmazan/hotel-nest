import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LimpiezaModule } from './limpieza/limpieza.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

//const dbHost = process.env.DB_HOST || 'localhost';
//const dbHost = process.env.DB_HOST || '127.0.0.1';
//const dbPort = process.env.DB_PORT || '27017';
//const devDbName = process.env.DEV_DB_NAME || 'hotel';

@Module({
  imports: [
    LimpiezaModule,
    MongooseModule.forRoot(`mongodb://hotelDB/hotel`),
    UsuarioModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
