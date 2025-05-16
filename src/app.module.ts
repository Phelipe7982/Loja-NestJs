import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';

// Modulo principal da aplicação, importando o modulo de usuario
@Module({
  imports: [UsuarioModule]
})
export class AppModule { }
