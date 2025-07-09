import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) { }

    async listaProdutos(): Promise<ProdutoEntity[]> {
        const produtosSalvos = await this.produtoRepository.find();
        return produtosSalvos;
    }

    async criaProduto(produtoEntity: ProdutoEntity) {
        return await this.produtoRepository.save(produtoEntity);
    }

    async atualizaProduto(id: string, produtoEntity: AtualizaProdutoDTO) {
        const produto = await this.produtoRepository.findOne({ where: { id }, relations: ['caracteristicas', 'imagens'] });
        if (!produto) throw new Error('Produto não encontrado');

        // Atualiza campos simples
        produto.nome = produtoEntity.nome ?? produto.nome;
        produto.preco = produtoEntity.preco ?? produto.preco;
        produto.quantidade = produtoEntity.quantidade ?? produto.quantidade;
        produto.descricao = produtoEntity.descricao ?? produto.descricao;
        produto.categoria = produtoEntity.categoria ?? produto.categoria;

        // Atualiza apenas as características enviadas
        if (produtoEntity.caracteristicas) {
            for (const cDTO of produtoEntity.caracteristicas) {
                if (cDTO.id) {
                    // Procura a característica correspondente no produto
                    const existente = produto.caracteristicas.find(c => c.id === cDTO.id);
                    if (existente) {
                        existente.nome = cDTO.nome ?? existente.nome;
                        existente.descricao = cDTO.descricao ?? existente.descricao;
                    }
                }
            }
        }

        // Atualiza apenas as características enviadas
        if (produtoEntity.imagens) {
            for (const iDTO of produtoEntity.imagens) {
                if (iDTO.id) {
                    // Procura a característica correspondente no produto
                    const existente = produto.imagens.find(i => i.id === iDTO.id);
                    if (existente) {
                        existente.url = iDTO.url ?? existente.url;
                        existente.descricao = iDTO.descricao ?? existente.descricao;
                    }
                }
            }
        }

        await this.produtoRepository.save(produto);
        return this.produtoRepository.findOne({ where: { id }, relations: ['caracteristicas', 'imagens'] });
    }

    async deletaProduto(id: string) {
        await this.produtoRepository.delete(id);
    }
}