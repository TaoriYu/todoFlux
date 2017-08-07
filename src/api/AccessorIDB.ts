import Dexie from 'dexie';
import {ITask} from '../types/tasks';

export default class AccessorIDB extends Dexie {

  static instance: AccessorIDB;

  tasks: Dexie.Table<ITask, string>;

  static getInstance() {
    if (!AccessorIDB.instance) {
      AccessorIDB.instance = new AccessorIDB();
    }

    return AccessorIDB.instance;
  }

  private constructor() {
    super('TasksDB');

    this.version(1).stores({
      tasks: 'id, text, checked',
    });
  }
}