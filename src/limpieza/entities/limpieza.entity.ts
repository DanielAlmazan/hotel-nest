import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';

@Schema()
export class Limpieza extends Document {
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
  })
  habitacion: Habitacion;

  @Prop({
    default: Date.now,
  })
  fecha: Date;

  @Prop({
    trim: true,
  })
  observaciones: string;
}

export const LimpiezaSchema = SchemaFactory.createForClass(Limpieza);
