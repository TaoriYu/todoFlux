import * as FluxReduceStore from 'flux/lib/FluxReduceStore';
import * as Flux from 'flux';
import AppDispatcher from '../dispatchers/AppDispatcher';
// import AccessorIDB from './api/AccessorIDB';
import {DispatcherPayload} from '../types/tasks';
import {default as TasksActionFactory, TasksActions} from '../actions/TasksActionFactory';

interface TodoStoreState {
  id:       string;
  text?:    string;
  checked?: boolean;
}

export default class TodoStore extends FluxReduceStore<Array<TodoStoreState>, DispatcherPayload> {
  static _instance: TodoStore;

  static getInstance(): TodoStore {
    if (!TodoStore._instance) {
      // window['idb'] = AccessorIDB.getInstance();
      TasksActionFactory.getTasks();
      TodoStore._instance = new TodoStore(AppDispatcher.getInstance());
    }

    return TodoStore._instance;
  }

  constructor(dispatcher: Flux.Dispatcher<DispatcherPayload>) {
    super(dispatcher);
  }

  getInitialState(): Array<TodoStoreState> {
    return [];
  }

  reduce(state: Array<TodoStoreState>, {data, action}: DispatcherPayload): Array<TodoStoreState> {
    switch (action) {
      case TasksActions.addTask:
        return state.concat(data);

      case TasksActions.deleteTask:
        return state.filter((task: TodoStoreState) => task.id !== data.id);

      case TasksActions.deleteCheckedTask:
        return state.filter((task) => !task.checked);

      case TasksActions.checkTask:
        return state.map((task) => {
          let {text, checked, id} = task;

          if (id === data.id) {
            return {text, checked: !checked, id};
          } else {
            return task;
          }
        });

      case TasksActions.checkAllTasks:
        return state.map((task) => {
          let {text, checked, id} = task;

          if (checked) {
            return task;
          } else {
            return {text, checked: true, id};
          }
        });

      case TasksActions.unckeckAllTasks:
        return state.map((task) => {
          let {text, id} = task;
          return {text, checked: false, id};
        });

      case TasksActions.stopEditingTasks:
        return state.map((task) => {
          let {checked, id} = task;

          if (id === data.id) {
            return {text: data.text, checked, id};
          } else {
            return task;
          }
        });

      default:
        return state;
    }
  }
}