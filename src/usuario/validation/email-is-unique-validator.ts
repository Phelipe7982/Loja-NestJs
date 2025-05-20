import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()       // Transformamos esta classe de validação em um provider
@ValidatorConstraint({ async: true })       // Indicamos que essa validação será assíncrona
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {       // Implementando a interface ValidatorConstraintInterface

    // Injetando o repositório de usuário
    constructor(private usuarioRepository: UsuarioRepository) { }

    // Método de validação
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(value);
        return !usuarioComEmailExiste;
    }
}

// Um decorator personalizado utilizando a class validator acima
export const EmailisUnique = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailIsUniqueValidator
        });
    }
}