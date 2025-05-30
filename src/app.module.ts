import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';

// Modulo principal da aplicação, importando o modulo de usuario
@Module({
  imports: [UsuarioModule, ProdutoModule]
})
export class AppModule { }
