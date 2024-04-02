import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, password: string): Promise<any> {
    const usuario = await this.usuarioService.buscar(login, password);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    return await this.jwtService.signAsync({ login: login });
  }
}
