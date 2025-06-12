import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ProdutoEntity } from "./produto.entity";

@Entity({ name: "produto_imagens" })
export class ProdutoImagemEntity {

    // Toda entidade precisa de um id (obrigatório para o typeorm)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'url', length: 100, nullable: false })
    url: string;

    @Column({ name: 'descricao', length: 100, nullable: false })
    descricao: string;

    // Relação do TypeORM de N ... 1 (muitos para um) - N imagens podem pertencer a um produto
    @ManyToOne(() => ProdutoEntity, (produto) => produto.imagens)
    produto: ProdutoEntity;
}