import                     * as React from 'react';
import {Checkbox, Button, Icon, List} from 'semantic-ui-react';
import                         {Task} from './index';
import    AppDispatcher, {AppActions} from './Dispatcher';

interface TaskShowModeProps {
  task: Task;
  startEditing: () => void;
}
interface TaskShowModeStates {}

export default class TaskShowMode extends React.PureComponent<TaskShowModeProps, TaskShowModeStates> {

  constructor(props: TaskShowModeProps){
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
    this.checkTask  = this.checkTask.bind(this);
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

  render() {
    let {id, text, checked} = this.props.task;

    return(
      <List.Content className="flex-container">
        <Checkbox
          onChange={() => this.checkTask(id)}
          checked={checked}
        />
        <span
          className={`task-text ${checked && 'line-through'}`}
          onDoubleClick={this.props.startEditing}
        >
          {text}
        </span>
        <Button
          icon
          basic
          color="red"
          size="mini"
          floated="right"
          onClick={() => this.deleteTask(id)}
        >
          <Icon name="delete"/>
        </Button>
      </List.Content>
    );
  }
}