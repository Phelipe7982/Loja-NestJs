import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";

// Módulo de usuário puxando o controller de usuario.controller.ts
@Module({
    controllers: [UsuarioController]
})
export class UsuarioModule { }