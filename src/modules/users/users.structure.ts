import { responseUser } from './models/response/response-user-repository';
import { registerUser } from './models/params/params';
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
  register(params: registerUser): Promise<responseUser>;
  findAll(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
}

export interface IUserService {
  register(data: IUser): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findByCpf(cpf: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}
