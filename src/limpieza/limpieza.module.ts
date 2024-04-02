import { Module } from '@nestjs/common';
import { LimpiezaService } from './limpieza.service';
import { LimpiezaController } from './limpieza.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HabitacionSchema } from 'src/habitacion/entities/habitacion.entity';
import { LimpiezaSchema } from './entities/limpieza.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'habitaciones',
        schema: HabitacionSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'limpiezas',
        schema: LimpiezaSchema,
      },
    ]),
  ],
  controllers: [LimpiezaController],
  providers: [LimpiezaService],
})
export class LimpiezaModule {}
