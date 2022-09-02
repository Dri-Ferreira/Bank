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
  findAll(): Promise<responseUser[]>;
  findById(id: string): Promise<responseUser | null>;
}

export interface IUserService {
  register(data: IUser): Promise<IUser>;
  findAll(): Promise<responseUser[]>;
  findByCpf(cpf: string): Promise<responseUser | null>;
  findById(id: string): Promise<responseUser | null>;
}
