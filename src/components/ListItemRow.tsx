import * as React from 'react';
import {List} from 'semantic-ui-react';
import TaskShowMode from './TaskShowMode';
import TaskEditMode from './TaskEditMode';
import TasksActionFactory from '../actions/TasksActionFactory';
import {ITask} from '../types/tasks';

export interface IListItemRowProps {
  key: string;
  task: ITask;
}

interface IListItemRowState {
  isEditMode: boolean;
  taskValue?: string;
}

export default class ListItemRow extends React.PureComponent<IListItemRowProps, IListItemRowState> {

  constructor(props: IListItemRowProps) {
    super(props);

    this.state = {
      isEditMode: false,
      taskValue: this.props.task.text,
    };
  }

  render() {
    const {task} = this.props;
    const {isEditMode, taskValue} = this.state;

    return(
      <List.Item>
        {isEditMode ?
          <TaskEditMode
            task={task}
            taskValue={taskValue}
            changeTaskText={this.handleChangeTask}
            stopEditingTask={(e: React.SyntheticEvent<HTMLInputElement>) => this.stopEditingTask(e, task.id)}
          /> :
          <TaskShowMode
            task={task}
            startEditing={this.startEditing}
          />
        }
      </List.Item>
    );
  }

  private stopEditingTask = (e: React.SyntheticEvent<HTMLInputElement>, id: string): void => {
    e.preventDefault();
    this.setState({isEditMode: false});
    TasksActionFactory.stopEditingTasks({id: id, text: this.state.taskValue});
  }

  private startEditing = () => {
    this.setState({isEditMode: true});
  }

  private handleChangeTask = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({taskValue: e.currentTarget.value});
  }
}