import * as React from 'react';
import {Checkbox, Button, Icon, List} from 'semantic-ui-react';
import {ITask} from '../types/tasks';
import {default as TasksActionFactory} from '../actions/TasksActionFactory';

interface TaskShowModeProps {
  task: ITask;
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
    TasksActionFactory.deleteTask({id: id});
  }

  checkTask(task: ITask): void {
    TasksActionFactory.checkTask(task);
  }

  render() {
    let {id, text, checked} = this.props.task;

    return(
      <List.Content className="flex-container">
        <Checkbox
          onChange={() => this.checkTask(this.props.task)}
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