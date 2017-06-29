import                  * as React from 'react';
import               {Form, Input} from 'semantic-ui-react';
import                  generateID from './generateID';
import AppDispatcher, {AppActions} from './AppDispatcher';

interface ListHeadProps {}
interface ListHeadState {
  taskValue: string;
}

export default class ListHeader extends React.PureComponent<ListHeadProps, ListHeadState> {
  constructor(props: ListHeadProps) {
    super(props);

    this.state = {
      taskValue: ''
    };

    this.createTask = this.createTask.bind(this);
  }

  createTask(e: React.SyntheticEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (this.state.taskValue.length > 0) {
      AppDispatcher.getInstance().dispatch({
        eventName: AppActions.ADD_TASK,
        data: {
          text: this.state.taskValue,
          checked: false,
          id: generateID(),
        }
      });
    }

    this.setState({taskValue: ''});
  }

  render() {
    return(
      <Form onSubmit={this.createTask}>
        <Form.Field>
          <label>WHAT TO DO</label>
          <Input
            placeholder="type task"
            value={this.state.taskValue}
            onChange={(e) => this.setState({taskValue: e.currentTarget.value})}
          />
        </Form.Field>
      </Form>
    );
  }
}
