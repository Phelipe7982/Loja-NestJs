import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailIsUniqueValidator } from "./validation/email-is-unique-validator";

// Módulo de usuário puxando o controller de usuario.controller.ts
@Module({
    controllers: [UsuarioController],
    providers: [UsuarioRepository, EmailIsUniqueValidator]      // Injetando os providers
})
export class UsuarioModule { }