import * as React         from 'react';
import TasksActionFactory from '../../actions/TasksActionFactory';
import { Form, Input }    from 'semantic-ui-react';
import generateID         from '../../utils/generateID';

interface IHeadProps {}
interface IHeadState {
  taskValue: string;
}

export default class Header extends React.PureComponent<IHeadProps, IHeadState> {

  state: IHeadState = {
    taskValue: ''
  };

  private actions = TasksActionFactory;

  render() {
    const {taskValue} = this.state;
    return(
      <Form onSubmit={this.createTask}>
        <Form.Field>
          <label>WHAT TO DO</label>
          <Input
            placeholder="type task"
            value={taskValue}
            onChange={({currentTarget: {value}}) => this.setState({taskValue: value})}
          />
        </Form.Field>
      </Form>
    );
  }

  private createTask = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (this.state.taskValue.length > 0) {
      this.actions.addTask({
        id: generateID(),
        text: this.state.taskValue,
        checked: false,
      });
    }
    this.setState({taskValue: ''});
  }
}
