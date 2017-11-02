import {Dispatcher} from 'flux';
import {DispatcherPayload} from '../types/tasks';

export default class AppDispatcher extends Dispatcher<DispatcherPayload> {
  static _instance: AppDispatcher;

  static getInstance() {
    if (!AppDispatcher._instance) {
      AppDispatcher._instance = new Dispatcher();
    }
    return AppDispatcher._instance;
  }
}