import * as FluxReduceStore from 'flux/lib/FluxReduceStore';
import {AppActions, default as AppDispatcher, AppPayload} from './Dispatcher';
import generateID from './generateID';

export interface TodoStoreState {
  text?: string;
  checked?: boolean;
  id: string;
  isEditMode?: boolean;
}

export default class TodoStore extends FluxReduceStore<Array<TodoStoreState>, AppPayload> {
  static _instance: TodoStore;

  static getInstance(): TodoStore {
    if (!TodoStore._instance) {
      TodoStore._instance = new TodoStore(AppDispatcher.getInstance());
    }
    return TodoStore._instance;
  }

  getInitialState(): Array<TodoStoreState> {
    return [
      {text: 'First task', checked: false, id: generateID(), isEditMode: false},
      {text: 'Do smth useful', checked: false, id: generateID(), isEditMode: false},
      {text: 'Frustrate maybe', checked: false, id: generateID(), isEditMode: false}
    ];
  }

  reduce(state: Array<TodoStoreState>, {data, eventName}: AppPayload) {
    switch (eventName) {
      case AppActions.ADD_TASK:
        return state.concat(data);

      case AppActions.DELETE_TASK:
        return state.filter((task: TodoStoreState) => task.id !== data.id);

      case AppActions.CHECK_TASK:
        return state.map((task) => {
          if (task.id === data.id) {
            return {text: task.text, checked: !task.checked, id: task.id, isEditMode: false};
          } else {
            return task;
          }
        });

      case AppActions.START_EDITING_TASK:
        return state.map((task) => {
          if (task.id === data.id) {
            return {text: task.text, checked: task.checked, id: task.id, isEditMode: true};
          } else {
            return task;
          }
        });

      case AppActions.STOP_EDITING_TASK:
        return state.map((task) => {
          if (task.id === data.id) {
            return {text: data.text, checked: task.checked, id: task.id, isEfitMode: false};
          } else {
            return task;
          }
        });

      default:
        return state;
    }
  }
}