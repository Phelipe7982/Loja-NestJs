import { Controller, Post, Body, Get } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from "uuid";

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
        const usuarioEntity = new UsuarioEntity();      // Instanciando a entidade usuário
        usuarioEntity.id = uuid();                      // Usando o uuid para dar um id aleatório
        usuarioEntity.nome = dadosDoUsuario.nome;       // Salvando o nome do user no usuarioEntity
        usuarioEntity.email = dadosDoUsuario.email;     // Salvando o email do user no usuarioEntity
        usuarioEntity.senha = dadosDoUsuario.senha;     // Salvando a senha do user no usuarioEntity

        // Adicionando o user no array de usuarios do repository
        this.usuarioRepository.salvar(usuarioEntity);
        return { msg: `O usuário do id ${usuarioEntity.id} foi cadastrado com sucesso!` };
    }
}