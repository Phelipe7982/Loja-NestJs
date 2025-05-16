import { UsuarioInterface } from "./usuario.interface";

export class UsuarioRepository {
    private usuarios: UsuarioInterface[] = [];

    async salvar(usuario: UsuarioInterface) {
        this.usuarios.push(usuario);
    }

    async listar() {
        return this.usuarios;
    }
}