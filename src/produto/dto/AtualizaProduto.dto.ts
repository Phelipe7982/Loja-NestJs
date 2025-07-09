import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { CaracteristicaProdutoDTO, ImagemProdutoDTO } from './CriaProduto.dto';

export class AtualizaCaracteristicaProdutoDTO {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    nome?: string;

    @IsString()
    @IsOptional()
    descricao?: string;
}

export class AtualizaImagemProdutoDTO {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    url?: string;

    @IsString()
    @IsOptional()
    descricao?: string;
}

export class AtualizaProdutoDTO {
    @IsUUID(undefined, { message: 'ID do produto inválido' })
    @IsOptional()
    id: string;

    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    @IsOptional()
    usuarioId: string;

    @IsString()
    @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
    @IsOptional()
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @IsOptional()
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    @IsOptional()
    preco: number;

    @IsNumber()
    @Min(0, { message: 'Quantidade mínima inválida' })
    @IsOptional()
    quantidade: number;

    @IsString()
    @IsOptional()
    descricao: string;

    @IsString()
    @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
    @IsOptional()
    categoria: string;

    @ValidateNested()
    @IsArray()
    @Type(() => AtualizaCaracteristicaProdutoDTO)
    @IsOptional()
    caracteristicas?: AtualizaCaracteristicaProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => AtualizaImagemProdutoDTO)
    @IsOptional()
    imagens: AtualizaImagemProdutoDTO[];
}