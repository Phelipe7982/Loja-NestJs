// class-validator (biblioteca do nest que permite realizar validações do corpo da requisição)
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CriaProdutoDTO {

    // Diz que este atributo deve ser uma string e não pode ser vazio
    @IsString({ message: "O nome deve ser uma string" })
    @IsNotEmpty({ message: "O nome é um campo obrigatório" })
    nome: string;

    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: "O preco deve ser um numero" })     // Diz que este atributo deve ser uma string
    @IsPositive({ message: "O preco deve ser um numero positivo" })
    preco: number;
}