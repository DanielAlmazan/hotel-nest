import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLimpiezaDto } from './dto/create-limpieza.dto';
import { UpdateLimpiezaDto } from './dto/update-limpieza.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Limpieza } from './entities/limpieza.entity';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';

@Injectable()
export class LimpiezaService {
  constructor(
    @InjectModel('limpiezas')
    private readonly limpiezaModel: Model<Limpieza>,
    @InjectModel('habitaciones')
    private readonly habitacionModel: Model<Habitacion>,
  ) {}

  async create(createLimpiezaDto: CreateLimpiezaDto) {
    const nuevaLimpieza = await this.limpiezaModel.create(createLimpiezaDto);
    this.updateUltimaLimpieza(nuevaLimpieza.habitacion._id);
    return nuevaLimpieza;
  }

  async findAll(id: string) {
    try {
      const resultado = await this.limpiezaModel
        .find({ habitacion: id })
        .sort('-fecha');
      return resultado;
    } catch (e) {
      throw new InternalServerErrorException('La habitación buscada no existe');
    }
  }

  async update(id: string, updateLimpiezaDto: UpdateLimpiezaDto) {
    try {
      const limpiezaActualizada = await this.limpiezaModel.findByIdAndUpdate(
        id,
        { $set: updateLimpiezaDto },
        { new: true, runValidators: true },
      );
      if (!limpiezaActualizada)
        throw new NotFoundException('Limpieza no encontrada');
      this.updateUltimaLimpieza(limpiezaActualizada.habitacion._id);
      return limpiezaActualizada;
    } catch (e) {
      throw new InternalServerErrorException('La limpieza buscada no existe');
    }
  }

  private async updateUltimaLimpieza(id: string) {
    const limpiezas = await this.findAll(id);
    await this.habitacionModel.findByIdAndUpdate(
      id,
      {
        $set: { ultimaLimpieza: limpiezas[0].fecha },
      },
      { runValidators: true },
    );
  }

  async getEstadoLimpieza(id: string) {
    try {
      const ultimaLimpieza = (await this.habitacionModel.findById(id))
        .ultimaLimpieza;
      const fechaActual = new Date(Date.now());
      const estado =
        ultimaLimpieza.toLocaleDateString('es-ES') ==
        fechaActual.toLocaleDateString('es-ES');
      return { ok: estado };
    } catch (e) {
      throw new InternalServerErrorException('La limpieza buscada no existe');
    }
  }

  async getHabitacionesLimpias() {
    const habitaciones = await this.habitacionModel.find();
    const habitacionesLimpias = await Promise.all(
      habitaciones.map(async (habitacion) => {
        const estado = await this.getEstadoLimpieza(habitacion._id);
        if (estado.ok == true) return habitacion;
      }),
    );
    return habitacionesLimpias.filter((habitacion) => habitacion);
  }

  async getHabitacionesSucias() {
    const habitaciones = await this.habitacionModel.find();
    const habitacionesSucias = await Promise.all(
      habitaciones.map(async (habitacion) => {
        const estado = await this.getEstadoLimpieza(habitacion._id);
        if (estado.ok == false) return habitacion;
      }),
    );
    return habitacionesSucias.filter((habitacion) => habitacion);
  }
}
