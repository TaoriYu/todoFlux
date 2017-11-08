import * as React from 'react';
import {Form, Input} from 'semantic-ui-react';
import {ITask} from '../types/tasks';

interface ITaskEditModeProps {
  task: ITask;
  taskValue?: string;
  changeTaskText: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  stopEditingTask: (e: React.SyntheticEvent<HTMLInputElement>, id: string) => void;
}

interface ITaskEditModeStates {

}

export default class TaskEditMode extends React.PureComponent<ITaskEditModeProps, ITaskEditModeStates> {

  private textInput: HTMLInputElement;

  constructor(props: ITaskEditModeProps) {
    super(props);
  }

  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    const {stopEditingTask, taskValue, changeTaskText} = this.props;

    return(
      <Form onSubmit={stopEditingTask}>
        <Form.Field>
          <Input
            value={taskValue}
            onChange={changeTaskText}
            ref={(ref: HTMLInputElement) => this.textInput = ref}
          />
        </Form.Field>
      </Form>
    );
  }
}