import * as React from 'react';
import { Form, Input } from 'semantic-ui-react';
import { ITask } from '../../types/tasks';

interface IEditModeProps {
  task: ITask;
  taskValue?: string;
  changeTaskText: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  stopEditingTask: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

interface IEditModeStates {}

export default class EditMode extends React.PureComponent<IEditModeProps, IEditModeStates> {
  textInput: Input;

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
            ref={(ref) => ref ? this.textInput = ref : null}
          />
        </Form.Field>
      </Form>
    );
  }
}