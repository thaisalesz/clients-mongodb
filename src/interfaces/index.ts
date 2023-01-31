export interface IClient{
    id: string;
    name: string;
    email: string;
    phone: string;
    address: Address;
    cpf: string;
}

export interface Address{
    street: string;
    number: number;
    postCode: string;
    city: string;
    country: string;
}

export interface IClientUpdate{
    name?: string;
    email?: string;
    phone?: string;
    address?: Address;
    cpf?: string;
}

export interface ILogin{
    username: string;
    password: string;
}