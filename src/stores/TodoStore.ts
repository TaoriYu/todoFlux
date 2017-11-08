import * as FluxReduceStore          from 'flux/lib/FluxReduceStore';
import { IDispatcherPayload, ITask } from '../types/tasks';
import { ETasksActions }             from '../actions/TasksActionFactory';
import AppDispatcher                 from '../dispatchers/AppDispatcher';

interface ITodoStoreState {
  id:       string;
  text?:    string;
  checked?: boolean;
}

class TodoStore extends FluxReduceStore<Array<ITodoStoreState>, IDispatcherPayload> {

  getInitialState(): Array<ITodoStoreState> {
    return [];
  }

  reduce(state: Array<ITodoStoreState>, {data, action}: IDispatcherPayload): Array<ITodoStoreState> {
    switch (action) {
      case ETasksActions.addTask:
        return state.concat(data);

      case ETasksActions.deleteTask:
        return this.deleteTask(data);

      case ETasksActions.deleteCheckedTask:
        return this.deleteCheckedTask();

      case ETasksActions.checkTask:
        return this.checkTask(data);

      case ETasksActions.checkAllTasks:
        return this.checkAllTasks();

      case ETasksActions.uncheckAllTasks:
        return this.unckeckAllTasks();

      case ETasksActions.stopEditingTasks:
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

export default new TodoStore(AppDispatcher.getInstance());