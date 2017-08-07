import * as React from 'react';
import {List} from 'semantic-ui-react';
import TaskShowMode from './TaskShowMode';
import TaskEditMode from './TaskEditMode';
import TasksActionFactory from './actions/TasksActionFactory';
import {ITask} from './types/tasks';
import ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export interface ListItemRowProps {
  key: string;
  task: ITask;
}
interface ListItemRowState {
  isEditMode: boolean;
  taskValue?: string;
}

export default class ListItemRow extends React.PureComponent<ListItemRowProps, ListItemRowState> {
  constructor(props: ListItemRowProps) {
    super(props);

    this.state = {
      isEditMode: false,
      taskValue: this.props.task.text,
    };

    this.UniversalTask   = this.UniversalTask.bind(this);
    this.startEditing    = this.startEditing.bind(this);
    this.stopEditingTask = this.stopEditingTask.bind(this);
  }

  UniversalTask() {
    const task = this.props.task;

    return this.state.isEditMode ?
      <TaskEditMode
        task={task}
        taskValue={this.state.taskValue}
        changeTaskText={(e: React.SyntheticEvent<HTMLInputElement>) => {
          this.setState({taskValue: e.currentTarget.value});
        }}
        stopEditingTask={(e: React.SyntheticEvent<HTMLInputElement>) => this.stopEditingTask(e, task.id)}
      /> :
      <TaskShowMode
        task={task}
        startEditing={() => this.startEditing()}
      />;
  }

  startEditing() {
    this.setState({isEditMode: true});
  }

  stopEditingTask(e: React.SyntheticEvent<HTMLInputElement>, id: string): void {
    e.preventDefault();
    this.setState({isEditMode: false});
    TasksActionFactory.stopEditingTasks({id: id, text: this.state.taskValue});
  }

  render() {
    return(
      <ReactCSSTransitionGroup
        transitionName={{
          enter: 'in',
          leave: 'out'
        }}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        component="div"
        role="listitem"
        className="item animating transition slide down"
        key={this.props.key}
      >
        <List.Item>
          <this.UniversalTask key={this.props.key}/>
        </List.Item>
      </ReactCSSTransitionGroup>
    );
  }
}