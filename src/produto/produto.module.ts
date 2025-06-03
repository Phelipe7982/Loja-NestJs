import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoRepository } from "./produto.repository";
import { UsuarioModule } from "src/usuario/usuario.module";

// Módulo de usuário puxando o controller de usuario.controller.ts
@Module({
    imports: [UsuarioModule],
    controllers: [ProdutoController],
    providers: [ProdutoRepository]      // Injetando os providers
})
export class ProdutoModule { }