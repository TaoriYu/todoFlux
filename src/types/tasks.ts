import { ETasksActions } from '../actions/TasksActionFactory';

export interface ITask {
  id:       string;
  text?:    string;
  checked?: boolean;
}

export interface IDispatcherPayload {
  action: ETasksActions;
  data: {
    id:       string,
    text?:    string,
    checked?: boolean,
  };
}