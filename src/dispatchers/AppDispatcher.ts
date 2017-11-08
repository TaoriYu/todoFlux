import { IDispatcherPayload } from '../types/tasks';
import { ETasksActions }      from '../actions/TasksActionFactory';
import { Dispatcher }         from 'flux';

export default class AppDispatcher extends Dispatcher<IDispatcherPayload> {
  static _instance: AppDispatcher;

  static getInstance() {
    if (!AppDispatcher._instance) {
      AppDispatcher._instance = new AppDispatcher();
    }
    return AppDispatcher._instance;
  }

  constructor() {
    super();
    if (process.env.NODE_ENV === 'development') {
      this.register(this.logs);
    }
  }

  logs(payload: IDispatcherPayload) {
    console.group('%c======> AppDispatcher <======', 'color: cyan;');
    window.console.log(`%caction ${ETasksActions[payload.action]}`, 'color: yellow;');
    window.console.log(`%cdata`, 'color: yellow;', payload.data);
    console.groupEnd();
  }
}