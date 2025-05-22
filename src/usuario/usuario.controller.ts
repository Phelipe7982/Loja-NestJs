import { Controller, Post, Body, Get, Put, Param } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

// Usando o decorator para declarar uma rota /usuarios
@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) { }

    // Decorator Get para dizer que é uma requisição do tipo get
    @Get()
    async listaUsuarios() {
        // Guarda todos os dados do user na variável usuariosSalvos
        const usuariosSalvos = await this.usuarioRepository.listar();
        // Modifica com o .map para guardar em usuariosLista apenas os seus ids e seus nomes
        const usuariosLista = usuariosSalvos.map(usuario => new ListaUsuarioDTO(usuario.id, usuario.nome))
        // Retorna apenas essas informações, ocultando o restante (email e senha)
        return usuariosLista;
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

    // Decorator Put para dizer que é uma requisição de atualização de dados, passando o parâmetro entre aspas
    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioRepository.atualizar(id, novosDados);
        return { usuario: usuarioAtualizado, msg: `O usuário foi cadastrado com sucesso!` };
    }
}