import * as React from 'react';
import {List} from 'semantic-ui-react';
import {Task} from './index';
import TaskShowMode from './TaskShowMode';
import TaskEditMode from './TaskEditMode';

export interface ListItemRowProps {
  key: string;
  task: Task;
}
interface ListItemRowState {}

export default class ListItemRow extends React.PureComponent<ListItemRowProps, ListItemRowState> {
  constructor(props: ListItemRowProps) {
    super(props);
  }

  render() {
    // диструкция блэдт где
    let taskView;
    if (this.props.task.isEditMode) {
      taskView =
        <TaskEditMode
          key={this.props.task.id}
          task={this.props.task}
        />;
    } else {
      taskView =
        <TaskShowMode
          key={this.props.task.id}
          task={this.props.task}
        />;
    }

    return(
      <List.Item>
        {taskView}
      </List.Item>
    );
  }
}