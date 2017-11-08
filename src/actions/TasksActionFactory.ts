import AppDispatcher from '../dispatchers/AppDispatcher';
import AccessorIDB   from '../api/AccessorIDB';
import { ITask }     from '../types/tasks';

export enum ETasksActions {
  addTask          ,
  checkAllTasks    ,
  checkTask        ,
  deleteCheckedTask,
  deleteTask       ,
  stopEditingTasks ,
  uncheckAllTasks  ,
}
const IDB = AccessorIDB.tasks;

function ActionFactory(action: ETasksActions, data: ITask = {id: ''}) {
  AppDispatcher.getInstance().dispatch({action, data});
}

export default class TasksActions {
  /** AccessorDB actions */

  static getTasks(cb: () => void) {
    IDB
      .toArray()
      .then(tasks => Promise.all(tasks.map(task => this.addTaskToStore(task))))
      .then(cb);
  }

  static addTask(data: ITask) {
    IDB
      .put(data)
      .then(() => TasksActions.addTaskToStore(data));
  }

  static deleteTask(data: ITask) {
    IDB
      .delete(data.id)
      .then(() => TasksActions.deleteTaskFromStore(data));
  }

  static checkTask(data: ITask) {
    IDB
      .update(data.id, {checked: !data.checked})
      .then(() => TasksActions.checkTaskInStore(data));
  }

  static deleteCheckedTask() {
    IDB
      .filter(({checked}) => !!checked)
      .toArray()
      .then(data => Promise.all(data.map(({id}) => IDB.delete(id))))
      .then(TasksActions.deleteCheckedTaskInStore);
  }

  static checkAllTasks() {
    IDB
      .toArray()
      .then(tasks => Promise.all(tasks.map(({id}) => IDB.update(id, {checked: true}))))
      .then(TasksActions.checkAllTasksInStore);
  }

  static uncheckAllTasks() {
    IDB
      .toArray()
      .then(tasks => Promise.all(tasks.map(task => IDB.update(task.id, {checked: false}))))
      .then(TasksActions.unckeckAllTasksInStore);
  }

  static stopEditingTasks({id, text, ...rest}: ITask) {
    IDB
      .update(id, {text})
      .then(() => TasksActions.updateTaskTextInStore({id, text, ...rest}));
  }

  /** Dispather Tasks */

  static updateTaskTextInStore(task: ITask) { ActionFactory(ETasksActions.stopEditingTasks, task); }
  static deleteTaskFromStore(task: ITask)   { ActionFactory(ETasksActions.deleteTask,       task); }
  static checkTaskInStore(task: ITask)      { ActionFactory(ETasksActions.checkTask,        task); }
  static addTaskToStore(task: ITask)        { ActionFactory(ETasksActions.addTask,          task); }

  static deleteCheckedTaskInStore()         { ActionFactory(ETasksActions.deleteCheckedTask); }
  static unckeckAllTasksInStore()           { ActionFactory(ETasksActions.uncheckAllTasks);   }
  static checkAllTasksInStore()             { ActionFactory(ETasksActions.checkAllTasks);     }

}