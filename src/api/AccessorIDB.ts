import { ITask } from '../types/tasks';
import Dexie     from 'dexie';

class AccessorIDB extends Dexie {

  tasks: Dexie.Table<ITask, string>;

  constructor() {
    super('TasksDB');
    this.version(1).stores({
      tasks: 'id, text, checked',
    });
  }
}

export default new AccessorIDB();