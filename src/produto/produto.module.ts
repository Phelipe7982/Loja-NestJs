import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoRepository } from "./produto.repository";

// Módulo de usuário puxando o controller de usuario.controller.ts
@Module({
    controllers: [ProdutoController],
    providers: [ProdutoRepository]      // Injetando os providers
})
export class ProdutoModule { }