import { Controller, Post, Body, Get, Put, Param, Delete } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { UsuarioService } from "./usuario.service";

// Usando o decorator para declarar uma rota /usuarios
@Controller('/usuarios')
export class UsuarioController {

    constructor(
        private usuarioRepository: UsuarioRepository,
        private usuarioService: UsuarioService
    ) { }

    // Decorator Get para dizer que é uma requisição do tipo get
    @Get()
    async listaUsuarios() {
        // Guarda todos os dados do user na variável usuariosSalvos
        const usuariosSalvos = await this.usuarioService.listaUsuarios();
        // Retorna apenas essas informações, ocultando o restante (email e senha)
        return usuariosSalvos;
    }

    // Decorator Post para dizer que é uma requisição do tipo post
    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();      // Instanciando a entidade usuário
        usuarioEntity.id = uuid();                      // Usando o uuid para dar um id aleatório
        usuarioEntity.nome = dadosDoUsuario.nome;       // Salvando o nome do user no usuarioEntity
        usuarioEntity.email = dadosDoUsuario.email;     // Salvando o email do user no usuarioEntity
        usuarioEntity.senha = dadosDoUsuario.senha;     // Salvando a senha do user no usuarioEntity

        // Acessa a função do usuarioService
        this.usuarioService.criaUsuario(usuarioEntity);
        return {
            usuario: usuarioEntity,
            msg: `O usuário foi cadastrado com sucesso!`
        };
    }

    // Decorator Put para dizer que é uma requisição de atualização de dados, passando o parâmetro entre aspas
    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, novosDados);
        return {
            usuario: usuarioAtualizado,
            msg: `O usuário foi atualizado com sucesso!`
        };
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioService.deletaUsuario(id);
        return {
            usuario: usuarioRemovido,
            msg: "Usuário removido com sucesso!"
        }
    }
}