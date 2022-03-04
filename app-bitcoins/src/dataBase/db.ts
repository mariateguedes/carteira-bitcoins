import Dexie, { Table } from 'dexie';

export interface Transaction {
  name: string;
  value: number;
}
export interface TransactionType {
  selled: Transaction;
  bought: Transaction;
}
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  real: number;
  bitcoin: number;
  brita: number;
  transaction?: TransactionType[];
}

export class MySubClassedDexie extends Dexie {
  users!: Table<User>; 

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      users: '++id, name, email, password, real, bitcoin, brita' 
    });
  };

}

export const db = new MySubClassedDexie();