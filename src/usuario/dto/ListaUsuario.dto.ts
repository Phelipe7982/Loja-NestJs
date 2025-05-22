// DTO para listar o(s) usuário(s) sem mostrar os dados pessoais do mesmo, retornando apenas seu id e nome

export class ListaUsuarioDTO {
    constructor(
        readonly id: string,
        readonly nome: string
    ) { }
}