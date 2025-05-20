import { Injectable } from "@nestjs/common";
import { UsuarioInterface } from "./usuario.interface";

// Usando o decorator para declarar esta classe como um provider
@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioInterface[] = [];      // Array de usuários

    // Método para salvar um usuário
    async salvar(usuario: UsuarioInterface) {
        this.usuarios.push(usuario);
    }

    // Método para listar os usuários
    async listar() {
        return this.usuarios;
    }

    // Método para verificar se existe um usuário com o email informado
    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find((usuario) => usuario.email === email);
        return possivelUsuario !== undefined;       // Retorna true se houver um usuário com o email informado
    }
}