import { UsuarioInterface } from "./Usuario.interface";

export class UsuarioRepository {
    private usuarios: UsuarioInterface[] = [];

    async salvar(usuario) {
        this.usuarios.push(usuario);
        console.log(this.usuarios);
    }

    async listar() {
        return this.usuarios;
    }
}