import Dexie, { Table } from 'dexie';
import { User } from '../api/Models';

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