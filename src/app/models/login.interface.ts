export interface ILogin {
    email?: string | null;
    password?: string | null;
}

export interface IRegister {
    email: string;
    password: string;
}