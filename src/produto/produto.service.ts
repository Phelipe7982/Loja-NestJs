import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";

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
        await this.produtoRepository.save(produtoEntity);
    }

    async atualizaProduto(id: string, produtoEntity: AtualizaProdutoDTO) {
        await this.produtoRepository.update(id, produtoEntity);
        return this.produtoRepository.findOne({ where: { id } });
    }

    async deletaProduto(id: string) {
        await this.produtoRepository.delete(id);
    }
}