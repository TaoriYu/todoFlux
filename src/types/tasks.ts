import {TasksActions} from '../actions/TasksActionFactory';

export interface ITask {
  id:       string;
  text?:    string;
  checked?: boolean;
}

export interface DispatcherPayload {
  action: TasksActions;
  data: {
    id:       string,
    text?:    string,
    checked?: boolean,
  };
}

