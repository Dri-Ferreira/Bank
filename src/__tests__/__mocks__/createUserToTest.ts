import { faker } from '@faker-js/faker';

export default async () => {
  return {
    id: faker.random.alphaNumeric(20),
    name: faker.internet.userName(),
    cpf: faker.random.numeric(11),
    password: faker.internet.password(8),
    email: faker.internet.email(),
    doc_identity: faker.random.alphaNumeric(10),
    address: faker.address.streetAddress(),
    cep: faker.random.numeric(9),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
};
