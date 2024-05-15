// Importa los módulos necesarios de NestJS y los modelos
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module'; // Suponiendo que AppModule es tu módulo principal
import { Habitacion } from './src/habitacion/entities/habitacion.entity';
import { Limpieza } from './src/limpieza/entities/limpieza.entity';
import { Usuario } from './src/usuario/entities/usuario.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  // Ahora puedes interactuar con tus modelos y la base de datos

  // Crea las habitaciones, limpiezas y usuarios
  const habitaciones = [
    new Habitacion({
      id: '1a1a1a1a1a1a1a1a1a1a1a1a',
      numero: 1,
      tipo: 'doble',
      descripcion: 'Habitación doble, cama XL, terraza con vistas al mar',
      ultimaLimpieza: new Date('2023-09-20T11:24:00Z'),
      precio: 59.9,
      incidencias: [
        {
          id: '10011a1a1a1a1a1a1a1a1a1a',
          descripcion: 'No funciona el aire acondicionado',
          inicio: new Date('2023-09-19T18:12:54Z'),
        },
        {
          id: '10021a1a1a1a1a1a1a1a1a1a',
          descripcion: 'No funciona el interruptor del aseo',
          inicio: new Date('2023-09-20T10:15:06Z'),
        },
      ],
    }),
    new Habitacion({
      id: '2b2b2b2b2b2b2b2b2b2b2b2b',
      numero: 2,
      tipo: 'familiar',
      descripcion: 'Habitación familiar, cama XL y literas, aseo con bañera',
      ultimaLimpieza: new Date('2023-08-02T10:35:15Z'),
      precio: 65.45,
    }),
    new Habitacion({
      id: '3c3c3c3c3c3c3c3c3c3c3c3c',
      numero: 3,
      tipo: 'familiar',
      descripcion:
        'Habitación familiar, cama XL y sofá cama, cocina con nevera',
      precio: 69.15,
    }),
    new Habitacion({
      id: '4d4d4d4d4d4d4d4d4d4d4d4d',
      numero: 4,
      tipo: 'suite',
      descripcion: 'Habitación con dos camas XL, terraza y vistas al mar',
      ultimaLimpieza: new Date('2023-10-10T12:05:10Z'),
      precio: 110.2,
      incidencias: [
        {
          id: '10014d4d4d4d4d4d4d4d4d4d',
          descripcion: 'No funciona el jacuzzi',
          inicio: new Date('2023-10-08T19:24:43Z'),
        },
      ],
    }),
    new Habitacion({
      id: '5e5e5e5e5e5e5e5e5e5e5e5e',
      numero: 5,
      tipo: 'individual',
      descripcion: 'Habitación simple, cama 150',
      precio: 34.65,
    }),
  ];

  const limpiezas = [
    new Limpieza({
      id: '20011a1a1a1a1a1a1a1a1a1a',
      habitacion: '1a1a1a1a1a1a1a1a1a1a1a1a',
      fecha: new Date('2023-09-18T10:59:12Z'),
      observaciones: 'Dejan toallas para cambiar',
    }),
    new Limpieza({
      id: '20021a1a1a1a1a1a1a1a1a1a',
      habitacion: '1a1a1a1a1a1a1a1a1a1a1a1a',
      fecha: new Date('2023-09-20T11:24:00Z'),
    }),
    new Limpieza({
      id: '20012b2b2b2b2b2b2b2b2b2b',
      habitacion: '2b2b2b2b2b2b2b2b2b2b2b2b',
      fecha: new Date('2023-08-02T10:35:15Z'),
      observaciones: 'Desperfectos en puerta del aseo',
    }),
    new Limpieza({
      id: '20013c3c3c3c3c3c3c3c3c3c',
      habitacion: '3c3c3c3c3c3c3c3c3c3c3c3c',
    }),
    new Limpieza({
      id: '20014d4d4d4d4d4d4d4d4d4d',
      habitacion: '4d4d4d4d4d4d4d4d4d4d4d4d',
      fecha: new Date('2023-10-09T11:00:25Z'),
    }),
    new Limpieza({
      id: '20024d4d4d4d4d4d4d4d4d4d',
      habitacion: '4d4d4d4d4d4d4d4d4d4d4d4d',
      fecha: new Date('2023-10-10T12:05:10Z'),
    }),
    new Limpieza({
      id: '20015e5e5e5e5e5e5e5e5e5e',
      habitacion: '5e5e5e5e5e5e5e5e5e5e5e5e',
    }),
  ];

  const usuarios = [
    new Usuario({ login: 'usuario1', password: 'password1' }),
    new Usuario({ login: 'admin', password: '12345678' }),
  ];

  // Guarda los modelos en la base de datos
  await Promise.all(habitaciones.map((h) => h.save()));
  await Promise.all(limpiezas.map((l) => l.save()));
  await Promise.all(usuarios.map((u) => u.save()));

  await app.close();
}
bootstrap();
