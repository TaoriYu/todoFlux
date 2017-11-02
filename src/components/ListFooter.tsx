import * as React from 'react';
import {Header} from 'semantic-ui-react';
import {Button} from 'semantic-ui-react';
import {default as TasksActionFactory} from '../actions/TasksActionFactory';

interface ListFooterProps {}
interface ListFooterState {
  allChecked: boolean;
}

export default class ListFooter extends React.PureComponent<ListFooterProps, ListFooterState> {

  constructor(props: ListFooterProps) {
    super(props);

    this.state = {
      allChecked: false,
    };

    this.checkAllTasks   = this.checkAllTasks.bind(this);
    this.uncheckAllTasks = this.uncheckAllTasks.bind(this);
    this.deleteChecked   = this.deleteChecked.bind(this);
  }

  checkAllTasks(): void {
    this.setState({allChecked: true});
    TasksActionFactory.checkAllTasks();
  }

  uncheckAllTasks(): void {
    this.setState({allChecked: false});
    TasksActionFactory.uncheckAllTasks();
  }

  deleteChecked(): void {
    this.setState({allChecked: false});
    TasksActionFactory.deleteCheckedTask();
  }

  render() {
    return(
      <div>
        <Header dividing/>
        <Button
          basic
          color="blue"
          size="mini"
          onClick={this.state.allChecked ? this.uncheckAllTasks : this.checkAllTasks}
        >
          {this.state.allChecked ? 'uncheck all' : 'check all'}
        </Button>
        <Button
          basic
          color="blue"
          size="mini"
          onClick={this.deleteChecked}
        >
          delete checked
        </Button>
      </div>
    );
  }
}
