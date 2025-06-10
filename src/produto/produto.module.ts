import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoRepository } from "./produto.repository";
import { UsuarioModule } from "src/usuario/usuario.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoService } from "./produto.service";

// Módulo de usuário puxando o controller de usuario.controller.ts
@Module({
    imports: [TypeOrmModule.forFeature([ProdutoEntity])],
    controllers: [ProdutoController],
    providers: [ProdutoRepository, ProdutoService]      // Injetando os providers
})
export class ProdutoModule { }