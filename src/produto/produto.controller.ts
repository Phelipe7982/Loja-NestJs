import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { ProdutoRepository } from './produto.repository';
import { ProdutoService } from './produto.service';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ProdutoImagemEntity } from './produto-imagem.entity';

@Controller('produtos')
export class ProdutoController {
    constructor(
        private readonly produtoRepository: ProdutoRepository,
        private readonly produtoService: ProdutoService
    ) { }

    @Post()
    async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
        const produto = new ProdutoEntity();

        produto.id = randomUUID();
        produto.nome = dadosProduto.nome;
        produto.usuarioId = dadosProduto.usuarioId;
        produto.preco = dadosProduto.preco;
        produto.quantidade = dadosProduto.quantidade;
        produto.descricao = dadosProduto.descricao;
        produto.categoria = dadosProduto.categoria;

        // Mapear características
        produto.caracteristicas = dadosProduto.caracteristicas.map((caracteristicaDTO) => {
            const caracteristica = new ProdutoCaracteristicaEntity();
            caracteristica.nome = caracteristicaDTO.nome;
            caracteristica.descricao = caracteristicaDTO.descricao;
            return caracteristica;
        });

        // Mapear imagens
        produto.imagens = dadosProduto.imagens.map((imagemDTO) => {
            const imagem = new ProdutoImagemEntity();
            imagem.url = imagemDTO.url;
            imagem.descricao = imagemDTO.descricao;
            return imagem;
        });

        const produtoCadastrado = await this.produtoService.criaProduto(produto);
        return {
            mensagem: "Produto criado com sucesso!",
            produto: produtoCadastrado
        };
    }

    @Get()
    async listaTodos() {
        return this.produtoService.listaProdutos();
    }

    @Put('/:id')
    async atualiza(@Param('id') id: string, @Body() dadosProduto: AtualizaProdutoDTO) {
        const produtoAlterado = await this.produtoService.atualizaProduto(id, dadosProduto);

        return {
            mensagem: 'produto atualizado com sucesso',
            produto: produtoAlterado,
        };
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        const produtoRemovido = await this.produtoService.deletaProduto(id);

        return {
            mensagem: 'produto removido com sucesso',
            produto: produtoRemovido,
        };
    }
}