import { Injectable } from "@nestjs/common";
import { UsuarioInterface } from "./usuario.interface";

// Usando o decorator para declarar esta classe como um provider
@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioInterface[] = [];

    async salvar(usuario: UsuarioInterface) {
        this.usuarios.push(usuario);
    }

    async listar() {
        return this.usuarios;
    }
}