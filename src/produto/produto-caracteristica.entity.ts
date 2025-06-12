import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ProdutoEntity } from "./produto.entity";

@Entity({ name: "produto_caracteristicas" })
export class ProdutoCaracteristicaEntity {

    // Toda entidade precisa de um id (obrigatório para o typeorm)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome', length: 100, nullable: false })
    nome: string;

    @Column({ name: 'descricao', length: 100, nullable: false })
    descricao: string;

    // Relação do TypeORM de N ... 1 (muitos para 1) - N caracteristicas podem pertencer a um produto (o inverso da entidade pai)
    @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristicas)
    produto: ProdutoEntity;
}