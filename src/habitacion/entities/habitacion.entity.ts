import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Habitacion extends Document {
  @Prop({
    required: true,
    min: 1,
    max: 50,
  })
  numero: number;

  @Prop({
    enum: ['individual', 'doble', 'familiar', 'suite'],
  })
  tipo: string;

  @Prop({
    required: true,
    trim: true,
  })
  descripcion: string;

  @Prop({
    required: true,
    default: Date.now,
  })
  ultimaLimpieza: Date;

  @Prop({
    required: true,
    min: 0,
    max: 300,
  })
  precio: number;
}

export const HabitacionSchema = SchemaFactory.createForClass(Habitacion);
