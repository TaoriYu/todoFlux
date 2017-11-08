import * as React from 'react';
import { default as TasksActionFactory } from '../../actions/TasksActionFactory';
import { Checkbox, Button, Icon, List }  from 'semantic-ui-react';
import { ITask }                         from '../../types/tasks';

interface ITaskShowModeProps {
  task: ITask;
  startEditing: () => void;
}

interface ITaskShowModeStates {}

export default class TaskShowMode extends React.PureComponent<ITaskShowModeProps, ITaskShowModeStates> {

  render() {
    let {task: {id, text, checked}, startEditing} = this.props;

    return(
      <List.Content className="flex-container">
        <Checkbox
          onChange={() => this.checkTask(this.props.task)}
          checked={checked}
        />
        <span
          className={`task-text ${checked && 'line-through'}`}
          onDoubleClick={startEditing}
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

  private deleteTask = (id: string): void => {
    TasksActionFactory.deleteTask({id});
  }

  private checkTask = (task: ITask): void => {
    TasksActionFactory.checkTask(task);
  }
}