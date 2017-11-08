import {Dispatcher} from 'flux';
import {IDispatcherPayload} from '../types/tasks';

export default class AppDispatcher extends Dispatcher<IDispatcherPayload> {
  static _instance: AppDispatcher;

  static getInstance() {
    if (!AppDispatcher._instance) {
      AppDispatcher._instance = new Dispatcher();
    }
    return AppDispatcher._instance;
  }
}