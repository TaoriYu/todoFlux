import    * as React from 'react';
import        {Task} from './index';
import {Form, Input} from 'semantic-ui-react';

interface TaskEditModeProps {
  task: Task;
  taskValue?: string;
  changeTaskText: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  stopEditingTask: (e: React.SyntheticEvent<HTMLInputElement>, id: string) => void;
}
interface TaskEditModeStates {}

export default class TaskEditMode extends React.PureComponent<TaskEditModeProps, TaskEditModeStates> {
  constructor(props: TaskEditModeProps) {
    super(props);
  }

  render() {
    return(
      <Form
        onSubmit={this.props.stopEditingTask}
      >
        <Form.Field>
          <Input
            value={this.props.taskValue}
            onChange={this.props.changeTaskText}
          />
        </Form.Field>
      </Form>
    );
  }
}