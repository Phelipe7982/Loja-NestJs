import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { ListaProdutoDTO } from "./dto/ListaProdutos.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { v4 as uuid } from "uuid";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Controller('/produtos')
export class ProdutoController {
    constructor(private produtoRepository: ProdutoRepository) { }

    @Get()
    async listaProdutos() {
        // Guarda todos os dados do produto na variável produtosSalvos
        const produtosSalvos = await this.produtoRepository.listar();
        // Modifica com o .map para guardar em produtosLista apenas os seus ids, seus nomes e seus preços
        const produtosLista = produtosSalvos.map(produto => new ListaProdutoDTO(produto.id, produto.nome, produto.preco))
        return produtosLista;
    }

    // Decorator Post para dizer que é uma requisição do tipo post
    @Post()
    async criaProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();      // Instanciando a entidade produto
        produtoEntity.id = uuid();                      // Usando o uuid para dar um id aleatório
        produtoEntity.nome = dadosDoProduto.nome;       // Salvando o nome do produto no produtoEntity
        produtoEntity.preco = dadosDoProduto.preco;     // Salvando o preco do produto no produtoEntity

        // Adicionando o produto no array de produtos do repository
        this.produtoRepository.salvar(produtoEntity);
        return {
            produto: produtoEntity,
            msg: `O produto foi cadastrado com sucesso!`
        };
    }

    // Decorator Put para dizer que é uma requisição de atualização de dados, passando o parâmetro entre aspas
    @Put('/:id')
    async atualizaProduto(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDTO) {
        const produtoAtualizado = await this.produtoRepository.atualizar(id, novosDados);
        return {
            produto: produtoAtualizado,
            msg: `O produto foi atualizado com sucesso!`
        };
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id: string) {
        const produtoRemovido = await this.produtoRepository.deletar(id);
        return {
            produto: produtoRemovido,
            msg: "Produto removido com sucesso!"
        }
    }
}