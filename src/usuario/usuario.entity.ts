import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

// Usando o typeorm para citar as nossas entidades que serão as tabelas no nosso db
@Entity({ name: 'usuarios' })     // nome da entidade (que será uma tabela do nosso db)
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Indicando para o typeorm que este será uma coluna da nossa tabela de usuários
    @Column({ name: 'nome', length: 100, nullable: false })       // length = tamanho máximo deste campo / nullable: false = o campo não pode ser null (mesma coisa do notNull)
    nome: string;

    @Column({ name: 'email', length: 70, nullable: false })
    email: string;

    @Column({ name: 'senha', length: 255, nullable: false })    // O length depende da forma que a senha será codificada e armazenada (hash no nosso caso)
    senha: string;

    // Estes campos serão criados pelo próprio typeorm (não fazem parte inicialmente da nossa entidade)
    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
}