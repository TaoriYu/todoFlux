import AppDispatcher from '../dispatchers/AppDispatcher';
import {ITask} from '../types/tasks';
import AccessorIDB from '../api/AccessorIDB';

export const enum TasksActions {
  addTask           = 1 << 0,
  deleteTask        = 1 << 1,
  deleteCheckedTask = 1 << 2,
  checkTask         = 1 << 3,
  checkAllTasks     = 1 << 4,
  unckeckAllTasks   = 1 << 5,
  stopEditingTasks  = 1 << 6,
  getTasks          = 1 << 7,
}

export default class TasksActionFactory {
  static dispatcher = AppDispatcher.getInstance();

  static getTasks() {
    AccessorIDB.getInstance().tasks.toArray().then((tasks) => {
      tasks.map((task) => {
        this.dispatcher.dispatch({
          action: TasksActions.addTask,
          data: task
        });
      });
    });
  }

  static addTask(data: ITask) {
    AccessorIDB.getInstance().tasks.put(data).then(() => {
      this.dispatcher.dispatch({
        action: TasksActions.addTask,
        data: data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  static deleteTask(data: ITask) {
    AccessorIDB.getInstance().tasks.delete(data.id).then(() => {
      this.dispatcher.dispatch({
        action: TasksActions.deleteTask,
        data: data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  static checkTask(data: ITask) {
    AccessorIDB.getInstance().tasks.update(data.id, {checked: !data.checked}).then(() => {
      this.dispatcher.dispatch({
        action: TasksActions.checkTask,
        data: data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  static deleteCheckedTask() {
    AccessorIDB.getInstance().tasks.filter((task) => { return task.checked === true; }).toArray().then((data) => {
      data.map((task) => {
        AccessorIDB.getInstance().tasks.delete(task.id);
      });

      this.dispatcher.dispatch({
        action: TasksActions.deleteCheckedTask,
        data: {id: ''}
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  static checkAllTasks() {
    AccessorIDB.getInstance().tasks.toArray().then((tasks) => {
      tasks.map((task) => {
        AccessorIDB.getInstance().tasks.update(task.id, {checked: true});
      });

      this.dispatcher.dispatch({
        action: TasksActions.checkAllTasks,
        data: {id: ''}
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  static  uncheckAllTasks() {
    AccessorIDB.getInstance().tasks.toArray().then((tasks) => {
      tasks.map((task) => {
        AccessorIDB.getInstance().tasks.update(task.id, {checked: false});
      });

      this.dispatcher.dispatch({
        action: TasksActions.unckeckAllTasks,
        data: {id: ''}
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  static stopEditingTasks(data: ITask) {
    AccessorIDB.getInstance().tasks.update(data.id, {text: data.text}).then(() => {
      this.dispatcher.dispatch({
        action: TasksActions.stopEditingTasks,
        data: data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
}