import * as React         from 'react';
import * as Task          from '../Task';
import TasksActionFactory from '../../actions/TasksActionFactory';
import { ITask }          from '../../types/tasks';
import { List }           from 'semantic-ui-react';

export interface IItemRowProps {
  key: string;
  task: ITask;
}

interface IItemRowState {
  isEditMode: boolean;
  value?: string;
}

export default class ItemRow extends React.PureComponent<IItemRowProps, IItemRowState> {

  state: IItemRowState = {
    isEditMode: false,
    value: this.props.task.text,
  };

  render() {
    const {task} = this.props;
    const {isEditMode, value} = this.state;

    return(
      <List.Item>
        {isEditMode ?
          <Task.EditMode
            task={task}
            taskValue={value}
            changeTaskText={this.handleChangeTask}
            stopEditingTask={(e: React.SyntheticEvent<HTMLInputElement>) => this.stopEditingTask(e, task.id)}
          /> :
          <Task.ShowMode
            task={task}
            startEditing={this.startEditing}
          />
        }
      </List.Item>
    );
  }

  private stopEditingTask = (e: React.SyntheticEvent<HTMLInputElement>, id: string): void => {
    e.preventDefault();
    this.setState({isEditMode: false}, () => {
      TasksActionFactory.stopEditingTasks({id, text: this.state.value});
    });
  }

  private startEditing = () => {
    this.setState({isEditMode: true});
  }

  private handleChangeTask = ({currentTarget: {value}}: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({value});
  }
}