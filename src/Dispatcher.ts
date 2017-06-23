import {Dispatcher} from 'flux';

export enum AppActions {
  ADD_TASK,
  DELETE_TASK,
  CHECK_TASK,
  START_EDITING_TASK,
  STOP_EDITING_TASK,
}

export interface AppPayload {
  eventName: AppActions;
  data: {
    text?: string,
    checked?: boolean,
    id: string,
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