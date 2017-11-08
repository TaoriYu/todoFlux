import * as React from 'react';
import {Header} from 'semantic-ui-react';
import {Button} from 'semantic-ui-react';
import {default as TasksActionFactory} from '../actions/TasksActionFactory';

interface IListFooterProps {}
interface IListFooterState {
  allChecked: boolean;
}

export default class ListFooter extends React.PureComponent<IListFooterProps, IListFooterState> {

  constructor(props: IListFooterProps) {
    super(props);
    this.state = { allChecked: false };
  }

  render() {
    const {allChecked} = this.state;
    const content = allChecked ?
      {text: 'uncheck all', action: this.uncheckAllTasks} :
      {text: 'check all', action: this.checkAllTasks};

    return(
      <div>
        <Header dividing/>
        <Button
          basic
          color="blue"
          content={content.text}
          size="mini"
          onClick={content.action}
        />
        <Button
          basic
          color="blue"
          content="delete checked"
          size="mini"
          onClick={this.deleteChecked}
        />
      </div>
    );
  }

  private deleteChecked = (): void => {
    this.setState({allChecked: false});
    TasksActionFactory.deleteCheckedTask();
  }

  private uncheckAllTasks = (): void => {
    this.setState({allChecked: false});
    TasksActionFactory.uncheckAllTasks();
  }

  private checkAllTasks = (): void => {
    this.setState({allChecked: true});
    TasksActionFactory.checkAllTasks();
  }
}
