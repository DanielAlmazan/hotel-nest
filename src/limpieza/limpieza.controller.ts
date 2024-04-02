import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { LimpiezaService } from './limpieza.service';
import { CreateLimpiezaDto } from './dto/create-limpieza.dto';
import { UpdateLimpiezaDto } from './dto/update-limpieza.dto';

@Controller('limpieza')
@UsePipes(ValidationPipe)
export class LimpiezaController {
  constructor(private readonly limpiezaService: LimpiezaService) {}

  @Post()
  create(@Body() createLimpiezaDto: CreateLimpiezaDto) {
    return this.limpiezaService.create(createLimpiezaDto);
  }

  @Get('limpias')
  getHabitacionesLimpias() {
    return this.limpiezaService.getHabitacionesLimpias();
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.limpiezaService.findAll(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLimpiezaDto: UpdateLimpiezaDto,
  ) {
    return this.limpiezaService.update(id, updateLimpiezaDto);
  }

  @Get('limpia/:id')
  getEstadoLimpieza(@Param('id') id: string) {
    return this.limpiezaService.getEstadoLimpieza(id);
  }
}
