// class-validator (biblioteca do nest que permite realizar validações do corpo da requisição)
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class AtualizaProdutoDTO {

    // Diz que este atributo deve ser uma string e não pode ser vazio
    @IsString({ message: "O nome deve ser uma string" })
    @IsNotEmpty({ message: "O nome é um campo obrigatório" })
    @IsOptional()       // Tornando o campo opicional
    nome: string;

    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: "O preço deve ser um numero" })     // Diz que este atributo deve ser uma string
    @IsPositive({ message: "O preco deve ser um numero positivo" })
    @IsOptional()       // Tornando o campo opicional
    preco: number;
}

// Os campos viraram todos opicionais já que este é o DTO para atualizar os dados do produto já salvo
// logo, o usuário decide qual dado ele quer atualizar