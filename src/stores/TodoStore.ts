import * as FluxReduceStore from 'flux/lib/FluxReduceStore';
import * as Flux from 'flux';
import AppDispatcher from '../dispatchers/AppDispatcher';
// import AccessorIDB from './api/AccessorIDB';
import {IDispatcherPayload, ITask} from '../types/tasks';
import {default as TasksActionFactory, TasksActions} from '../actions/TasksActionFactory';

interface ITodoStoreState {
  id:       string;
  text?:    string;
  checked?: boolean;
}

export default class TodoStore extends FluxReduceStore<Array<ITodoStoreState>, IDispatcherPayload> {
  static _instance: TodoStore;

  static getInstance(): TodoStore {
    if (!TodoStore._instance) {
      // window['idb'] = AccessorIDB.getInstance();
      TasksActionFactory.getTasks();
      TodoStore._instance = new TodoStore(AppDispatcher.getInstance());
    }

    return TodoStore._instance;
  }

  constructor(dispatcher: Flux.Dispatcher<IDispatcherPayload>) {
    super(dispatcher);
  }

  getInitialState(): Array<ITodoStoreState> {
    return [];
  }

  reduce(state: Array<ITodoStoreState>, {data, action}: IDispatcherPayload): Array<ITodoStoreState> {
    switch (action) {
      case TasksActions.addTask:
        return state.concat(data);

      case TasksActions.deleteTask:
        return this.deleteTask(data);

      case TasksActions.deleteCheckedTask:
        return this.deleteCheckedTask();

      case TasksActions.checkTask:
        return this.checkTask(data);

      case TasksActions.checkAllTasks:
        return this.checkAllTasks();

      case TasksActions.unckeckAllTasks:
        return this.unckeckAllTasks();

      case TasksActions.stopEditingTasks:
        return this.stopEditingTasks(data);

      default:
        return state;
    }
  }

  private deleteTask = (data: ITask): Array<ITodoStoreState> => {
    return this.getState().filter((task: ITodoStoreState) => task.id !== data.id);
  }

  private deleteCheckedTask = (): Array<ITodoStoreState> => {
    return this.getState().filter((task) => !task.checked);
  }

  private checkTask = (data: ITask): Array<ITodoStoreState> => {
    return this.getState().map( task => {
      let {text, checked, id} = task;
      return id === data.id ? {text, checked: !checked, id} : task;
    });
  }

  private checkAllTasks = (): Array<ITodoStoreState> => {
    return this.getState().map(task => {
      let {text, checked, id} = task;
      return checked ? task : {text, checked: true, id};
    });
  }

  private unckeckAllTasks = (): Array<ITodoStoreState> => {
    return this.getState().map((task) => {
      let {text, id} = task;
      return {text, checked: false, id};
    });
  }

  private stopEditingTasks = (data: ITask): Array<ITodoStoreState> => {
    return this.getState().map(task => {
      let {checked, id} = task;
      return id === data.id ? {text: data.text, checked, id} : task;
    });
  }
}
