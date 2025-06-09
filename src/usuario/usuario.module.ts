import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailIsUniqueValidator } from "./validation/email-is-unique-validator";
import { UsuarioService } from "./usuario.service";
import { UsuarioEntity } from "./usuario.entity";

// Módulo de usuário puxando o controller de usuario.controller.ts
@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository, EmailIsUniqueValidator]      // Injetando os providers
})
export class UsuarioModule { }