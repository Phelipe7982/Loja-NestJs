import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "produto_imagens" })
export class ProdutoImagem {

    // Toda entidade precisa de um id (obrigatório para o typeorm)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'url', length: 100, nullable: false })
    url: string;

    @Column({ name: 'descricao', length: 100, nullable: false })
    descricao: string;
}