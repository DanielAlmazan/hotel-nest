import { Injectable } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) {}

  async buscar(login: string, password: string): Promise<Usuario | undefined> {
    return this.usuarioModel.findOne({ login, password }).exec();
  }
}
