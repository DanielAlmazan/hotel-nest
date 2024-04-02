import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Usuario extends Document {
  @Prop({ required: true, unique: true })
  login: string;
  @Prop({ required: true })
  password: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
