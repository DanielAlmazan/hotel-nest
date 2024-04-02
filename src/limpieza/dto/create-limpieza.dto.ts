import { IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';

export class CreateLimpiezaDto {
  @IsNotEmpty({ message: 'La habitación es obligatoria' })
  @IsMongoId({ message: 'El ID de la habitación no existe' })
  readonly habitacion: Habitacion;

  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  @IsDateString()
  readonly fecha: Date;

  readonly observaciones: string;
}
