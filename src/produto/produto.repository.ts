import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutoRepository {
    private produtos: ProdutoEntity[] = [];

    async salvar(produto: ProdutoEntity) {
        this.produtos.push(produto);
    }

    async listar(): Promise<ProdutoEntity[]> {
        return this.produtos;
    }

    // Método privado para ver se o id passado pelo parâmetro, é referente a um produto válido (existente)
    private buscaPorId(id: string) {
        const possivelProduto = this.produtos.find((produtoSalvo) => produtoSalvo.id === id);

        if (!possivelProduto || possivelProduto === undefined) {
            throw new Error("O produto não existe.");
        }

        return possivelProduto;
    }

    // Método para atualizar os dados do produto passando como parâmetro o seu id
    // Usando o Partial do Ts para tornar todas os atributos de ProdutoEntity serem opcionais
    async atualizar(id: string, dadosDeAtualizacao: Partial<ProdutoEntity>) {
        // Se o id não for válido ele nem entra aqui!
        const produto = this.buscaPorId(id);

        // Transforma este dadosDeAtualização em um array de arrays para dar um forEach
        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            produto[chave] = valor;
        })

        return produto;
    }

    async deletar(id: string) {
        // Se o id não for válido ele nem entra aqui!
        const produto = this.buscaPorId(id);
        this.produtos = this.produtos.filter(produtoSalvo => produtoSalvo.id !== id);

        return produto;
    }
}