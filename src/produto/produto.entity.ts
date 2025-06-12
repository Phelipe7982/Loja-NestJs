import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ProdutoImagemEntity } from './produto-imagem.entity';

@Entity({ name: "produtos" })
export class ProdutoEntity {

    // Toda entidade precisa de um id (obrigatório para o typeorm)
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

    // Relação do TypeORM de 1 ... N (um para muitos) - Um produto pode possuir n caracteristicas
    @OneToMany(() => ProdutoCaracteristicaEntity, (produtoCaracteristicaEntity) =>
        // cascade = passar as informações da tabela pai para a filha e vice-versa | eager: sempre retornar ambas as infos de ambas as entidades (não obrigatória)
        produtoCaracteristicaEntity.produto, { cascade: true, eager: true })
    caracteristicas: ProdutoCaracteristicaEntity[];

    // Relação do TypeORM de 1 ... N (um para muitos) - Um produto pode possuir n imagens
    @OneToMany(() => ProdutoImagemEntity, (produtoImagemEntity) =>
        // cascade = passar as informações da tabela pai para a filha e vice-versa | eager: sempre retornar ambas as infos de ambas as entidades (não obrigatória)
        produtoImagemEntity.produto, { cascade: true, eager: true })
    imagens: ProdutoImagemEntity[];

    // Estes campos serão criados pelo próprio typeorm (não fazem parte inicialmente da entidade, mas é recomendado toda entidade ter)
    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}