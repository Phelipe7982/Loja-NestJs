import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

// Usando o decorator para declarar esta classe como um provider
@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];      // Array de usuários

    // Método para salvar um usuário
    async salvar(usuario: UsuarioEntity) {
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

    // Método privado para ver se o id passado pelo parâmetro, é referente a um usuário válido (existente)
    private buscaPorId(id: string) {
        const possivelUsuario = this.usuarios.find((usuarioSalvo) => usuarioSalvo.id === id);

        if (!possivelUsuario) {
            throw new Error("Usuário não existe.");
        }

        return possivelUsuario;
    }

    // Método para atualizar os dados do usuário passando como parâmetro o seu id
    // Usando o Partial do Ts para tornar todas os atributos de UsuarioEntity serem opcionais
    async atualizar(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        // Se o id não for válido ele nem entra aqui!
        const usuario = this.buscaPorId(id);

        // Transforma este dadosDeAtualização em um array de arrays para dar um forEach
        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            usuario[chave] = valor;
        })

        return usuario;
    }

    async deletar(id: string) {
        // Se o id não for válido ele nem entra aqui!
        const usuario = this.buscaPorId(id);
        this.usuarios = this.usuarios.filter(usuarioSalvo => usuarioSalvo.id !== id);

        return usuario;
    }
}