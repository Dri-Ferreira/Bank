export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  doc_identity: string;
  address: string;
  cep: string;
}

export interface IUserRepository {
  register(data: IUser): Promise<IUser>;
  findAll(): Promise<IUser[]>;
}

export interface IUserService {
  register(data: IUser): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findByCpf(cpf: string): Promise<IUser | null>;
}
