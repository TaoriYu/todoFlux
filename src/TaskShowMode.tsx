import * as React from 'react';
import {Task} from './index';
import {Checkbox} from 'semantic-ui-react';
import {Button, List} from 'semantic-ui-react';
import {Icon} from 'semantic-ui-react';
import AppDispatcher, {AppActions} from './Dispatcher';

interface TaskShowModeProps {
  key: string;
  task: Task;
}
interface TaskShowModeStates {}

export default class TaskShowMode extends React.PureComponent<TaskShowModeProps, TaskShowModeStates> {

  constructor(props: TaskShowModeProps){
    super(props);

    this.deleteTask   = this.deleteTask.bind(this);
    this.checkTask    = this.checkTask.bind(this);
    this.startEditing = this.startEditing.bind(this);
  }

  deleteTask(id: string): void {
    AppDispatcher.getInstance().dispatch({
      eventName: AppActions.DELETE_TASK,
      data: {
        id: id,
      }
    });
  }

  checkTask(id: string): void {
    AppDispatcher.getInstance().dispatch({
      eventName: AppActions.CHECK_TASK,
      data: {
        id: id,
      }
    });
  }

  startEditing(id: string): void {
    AppDispatcher.getInstance().dispatch({
      eventName: AppActions.START_EDITING_TASK,
      data: {
        id: id,
      }
    });
  }

  render() {
    return(
      <List.Content verticalAlign="middle">
        <Checkbox
          onChange={() => this.checkTask(this.props.task.id)}
        />
        <span
          className={`task-text ${this.props.task.checked && 'line-through'}`}
          onDoubleClick={() => this.startEditing(this.props.task.id)}
        >
          {this.props.task.text}
        </span>
        <Button
          icon
          basic
          color="red"
          size="mini"
          floated="right"
          onClick={() => this.deleteTask(this.props.task.id)}
        >
          <Icon name="delete"/>
        </Button>
      </List.Content>
    );
  }
}