import { Controller, Post, Body, Get } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";

// Usando o decorator para declarar uma rota /usuarios
@Controller('/usuarios')
export class UsuarioController {

    private usuarioRepository = new UsuarioRepository();

    // Decorator Post para dizer que é uma requisição do tipo post
    @Post()
    async criaUsuario(@Body() dadosDoUsuario) {
        this.usuarioRepository.salvar(dadosDoUsuario);
        return { msg: `Usuário cadastrado com sucesso!` };
    }

    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listar();
    }
}