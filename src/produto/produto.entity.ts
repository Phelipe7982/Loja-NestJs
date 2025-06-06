import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: "produtos" })
export class ProdutoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'usuario_id', length: 100, nullable: false })
    usuarioId: string;

    @Column({ name: 'nome', length: 100, nullable: false })
    nome: string;

    @Column({ name: 'preco', nullable: false })
    preco: number;

    @Column({ name: 'quantidade', nullable: false })
    quantidade: number;

    @Column({ name: 'descricao', length: 255, nullable: false })
    descricao: string;

    @Column({ name: 'categoria', length: 100, nullable: false })
    categoria: string;

    // caracteristicas: CaracteristicaProduto[];
    // imagens: ImagemProduto[];

    // Estes campos serão criados pelo próprio typeorm (não fazem parte inicialmente da entidade, mas é recomendado toda entidade ter)
    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}