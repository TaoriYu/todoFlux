import {Dispatcher} from 'flux';

export enum AppActions {
  ADD_TASK,
  DELETE_TASK,
  DELETE_CHECKED_TASKS,
  CHECK_TASK,
  CHECK_ALL_TASKS,
  UNCHECK_ALL_TASKS,
  STOP_EDITING_TASK,
}

export interface AppPayload {
  eventName: AppActions;
  data: {
    text?:    string,
    checked?: boolean,
    id:       string,
  };
}

export default class AppDispatcher extends Dispatcher<AppPayload> {
  static _instance: AppDispatcher;

  static getInstance() {
    if (!AppDispatcher._instance) {
      AppDispatcher._instance = new Dispatcher();
    }
    return AppDispatcher._instance;
  }
}