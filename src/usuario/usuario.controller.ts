import { Controller, Post, Body, Get } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";

// Usando o decorator para declarar uma rota /usuarios
@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) { }

    // Decorator Get para dizer que é uma requisição do tipo get
    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listar();
    }

    // Decorator Post para dizer que é uma requisição do tipo post
    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        this.usuarioRepository.salvar(dadosDoUsuario);
        return { msg: `Usuário cadastrado com sucesso!` };
    }
}