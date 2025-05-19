import { UsuarioInterface } from "../usuario.interface";
// class-validator (biblioteca do nest que permite realizar validações do corpo da requisição)
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CriaUsuarioDTO implements UsuarioInterface {

    // Diz que este atributo deve ser uma string e não pode ser vazio
    @IsString({ message: "O nome deve ser uma string" })
    @IsNotEmpty({ message: "O nome é um campo obrigatório" })
    nome: string;

    // @IsEmail()      // Diz que este atributo é um email
    @IsEmail(undefined, { message: "O email informado é inválido" })   // o undefined é porque não queremos passar nenhuma customização de validação
    email: string;

    @IsString({ message: "A senha deve ser uma string" })     // Diz que este atributo deve ser uma string
    @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })   // Determina um tamanho mínimo de caracteres
    senha: string;
}