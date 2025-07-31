import { Injectable } from '@nestjs/common';

type User = {
  id: number; //*UUID
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
};

const users: User[] = [
  {
    id: 1,
    name: 'Freddie Mercury',
    email: 'freddie@queen.com',
    password: 'bohemian123',
    address: 'Kensington, London',
    phone: '1234567890',
  },
  {
    id: 2,
    name: 'David Bowie',
    email: 'bowie@starman.net',
    password: 'ziggy456',
    address: 'Brixton, London',
    phone: '2345678901',
  },
  {
    id: 3,
    name: 'Aretha Franklin',
    email: 'aretha@respect.org',
    password: 'queenOfSoul',
    address: 'Memphis, Tennessee',
    phone: '3456789012',
  },
  {
    id: 4,
    name: 'Kurt Cobain',
    email: 'kurt@nirvana.com',
    password: 'nevermind1991',
    address: 'Aberdeen, Washington',
    phone: '4567890123',
  },
  {
    id: 5,
    name: 'Björk Guðmundsdóttir',
    email: 'bjork@ice.is',
    password: 'volta2025',
    address: 'Reykjavík, Iceland',
    phone: '5678901234',
  },
];

@Injectable()
export class UsersRepository {
  async getUsers() {
    return await users;
  }
}
