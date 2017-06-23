import * as React from 'react';
import {Task} from './index';
import {Input} from 'semantic-ui-react';
import {Form} from 'semantic-ui-react';
import AppDispatcher, {AppActions} from './Dispatcher';

interface TaskEditModeProps {
  key: string;
  task: Task;
}
interface TaskEditModeStates {
  taskValue?: string;
}

export default class TaskEditMode extends React.PureComponent<TaskEditModeProps, TaskEditModeStates> {
  constructor(props: TaskEditModeProps) {
    super(props);

    this.state = {
      taskValue: this.props.task.text,
    };

    this.stopEditingTask = this.stopEditingTask.bind(this);
  }

  stopEditingTask(e: React.SyntheticEvent<HTMLInputElement>, id: string) {
    e.preventDefault();
    AppDispatcher.getInstance().dispatch({
      eventName: AppActions.STOP_EDITING_TASK,
      data: {
        id: id,
        text: this.state.taskValue,
      }
    });
  }

  render() {
    return(
      <Form onSubmit={(e: React.SyntheticEvent<HTMLInputElement>) => this.stopEditingTask(e, this.props.task.id)}>
        <Form.Field>
          <Input
            value={this.state.taskValue}
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) => this.setState({taskValue: e.currentTarget.value})}
          />
        </Form.Field>
      </Form>
    );
  }
}