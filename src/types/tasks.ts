import {TasksActions} from '../actions/TasksActionFactory';

export interface ITask {
  id:       string;
  text?:    string;
  checked?: boolean;
}

export interface IDispatcherPayload {
  action: TasksActions;
  data: {
    id:       string,
    text?:    string,
    checked?: boolean,
  };
}