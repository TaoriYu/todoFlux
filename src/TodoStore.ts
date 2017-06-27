import                    * as FluxReduceStore from 'flux/lib/FluxReduceStore';
import                              generateID from './generateID';
import AppDispatcher, {AppActions, AppPayload} from './Dispatcher';

export interface TodoStoreState {
  text?:       string;
  checked?:    boolean;
  id:          string;
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
      {text: 'First task', checked: false, id: generateID()},
      {text: 'Do smth useful', checked: false, id: generateID()},
      {text: 'Frustrate maybe', checked: false, id: generateID()}
    ];
  }

  reduce(state: Array<TodoStoreState>, {data, eventName}: AppPayload) {
    switch (eventName) {
      case AppActions.ADD_TASK:
        return state.concat(data);

      case AppActions.DELETE_TASK:
        return state.filter((task: TodoStoreState) => task.id !== data.id);

      case AppActions.DELETE_CHECKED_TASKS:
        return state.filter((task) => !task.checked);

      case AppActions.CHECK_TASK:
        return state.map((task) => {
          if (task.id === data.id) {
            return {text: task.text, checked: !task.checked, id: task.id};
          } else {
            return task;
          }
        });

      case AppActions.CHECK_ALL_TASKS:
        return state.map((task) => {
          if (task.checked) {
            return task;
          } else {
            return {text: task.text, checked: true, id: task.id};
          }
        });

      case AppActions.UNCHECK_ALL_TASKS:
        return state.map((task) => {
          return {text: task.text, checked: false, id: task.id};
        });

      case AppActions.STOP_EDITING_TASK:
        return state.map((task) => {
          if (task.id === data.id) {
            return {text: data.text, checked: task.checked, id: task.id};
          } else {
            return task;
          }
        });

      default:
        return state;
    }
  }
}