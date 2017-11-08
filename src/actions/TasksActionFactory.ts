import AppDispatcher from '../dispatchers/AppDispatcher';
import {ITask} from '../types/tasks';
import AccessorIDB from '../api/AccessorIDB';

export const enum TasksActions {
  addTask          ,
  checkAllTasks    ,
  checkTask        ,
  deleteCheckedTask,
  deleteTask       ,
  stopEditingTasks ,
  unckeckAllTasks  ,
}

export default class TasksActionFactory {
  static dispatcher = AppDispatcher.getInstance();

  /** AccessorDB actions */

  static getTasks() {
    AccessorIDB.getInstance().tasks.toArray()
      .then(tasks => tasks.map(task => this.addTaskToStore(task)));
  }

  static addTask(data: ITask) {
    AccessorIDB.getInstance().tasks.put(data)
      .then(() => this.addTaskToStore(data));
  }

  static deleteTask(data: ITask) {
    AccessorIDB.getInstance().tasks.delete(data.id)
      .then(() => this.deleteTaskFromStore(data));
  }

  static checkTask(data: ITask) {
    AccessorIDB.getInstance().tasks.update(data.id, {checked: !data.checked})
      .then(() => this.checkTaskInStore(data));
  }

  static deleteCheckedTask() {
    AccessorIDB.getInstance().tasks.filter((task) => { return task.checked === true; }).toArray()
      .then(data => {
        data.map(task => AccessorIDB.getInstance().tasks.delete(task.id));
        this.deleteCheckedTaskInStore();
      });
  }

  static checkAllTasks() {
    AccessorIDB.getInstance().tasks.toArray()
      .then(tasks => {
        tasks.map(task => AccessorIDB.getInstance().tasks.update(task.id, {checked: true}));
        this.checkAllTasksInStore();
      });
  }

  static uncheckAllTasks() {
    AccessorIDB.getInstance().tasks.toArray()
      .then(tasks => {
        tasks.map(task => AccessorIDB.getInstance().tasks.update(task.id, {checked: false}));
        this.unckeckAllTasksInStore();
      });
  }

  static stopEditingTasks(data: ITask) {
    AccessorIDB.getInstance().tasks.update(data.id, {text: data.text})
      .then(() => this.updateTaskTextInStore(data));
  }

  /** Dispather Tasks */

  static addTaskToStore(task: ITask) {
    this.dispatcher.dispatch({
      action: TasksActions.addTask,
      data:   task
    });
  }

  static deleteTaskFromStore(task: ITask) {
    this.dispatcher.dispatch({
      action: TasksActions.deleteTask,
      data:   task
    });
  }

  static checkTaskInStore(task: ITask) {
    this.dispatcher.dispatch({
      action: TasksActions.checkTask,
      data:   task
    });
  }

  static deleteCheckedTaskInStore() {
    this.dispatcher.dispatch({
      action: TasksActions.deleteCheckedTask,
      data:   {id: ''}
    });
  }

  static checkAllTasksInStore() {
    this.dispatcher.dispatch({
      action: TasksActions.checkAllTasks,
      data:   {id: ''}
    });
  }

  static unckeckAllTasksInStore() {
    this.dispatcher.dispatch({
      action: TasksActions.unckeckAllTasks,
      data: {id: ''}
    });
  }

  static updateTaskTextInStore(task: ITask) {
    this.dispatcher.dispatch({
      action: TasksActions.stopEditingTasks,
      data: task
    });
  }
}