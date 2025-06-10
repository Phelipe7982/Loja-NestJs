import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "produto_caracteristicas" })
export class ProdutoCaracteristica {

    // Toda entidade precisa de um id (obrigatório para o typeorm)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome', length: 100, nullable: false })
    nome: string;

    @Column({ name: 'descricao', length: 100, nullable: false })
    descricao: string;
}