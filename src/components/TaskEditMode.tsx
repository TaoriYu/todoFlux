import * as React from 'react';
import {Form, Input} from 'semantic-ui-react';
import {ITask} from '../types/tasks';

interface TaskEditModeProps {
  task: ITask;
  taskValue?: string;
  changeTaskText: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  stopEditingTask: (e: React.SyntheticEvent<HTMLInputElement>, id: string) => void;
}
interface TaskEditModeStates {}

export default class TaskEditMode extends React.PureComponent<TaskEditModeProps, TaskEditModeStates> {
  private textInput: HTMLInputElement;

  constructor(props: TaskEditModeProps) {
    super(props);
  }

  componentDidMount() {
    this.textInput.focus();
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
            ref={(ref: HTMLInputElement) => this.textInput = ref}
          />
        </Form.Field>
      </Form>
    );
  }
}