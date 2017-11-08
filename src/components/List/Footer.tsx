import * as React         from 'react';
import TasksActionFactory from '../../actions/TasksActionFactory';
import { Header }         from 'semantic-ui-react';
import { Button }         from 'semantic-ui-react';

interface IFooterProps {}
interface IFooterState {
  allChecked: boolean;
}

export default class Footer extends React.PureComponent<IFooterProps, IFooterState> {

  state: IFooterState = {
    allChecked: false
  };

  render() {
    const { allChecked } = this.state;
    const {text, action} = allChecked ?
      {text: 'uncheck all', action: this.uncheckAllTasks} :
      {text: 'check all', action: this.checkAllTasks};

    return(
      <div>
        <Header dividing/>
        <Button
          basic
          color="blue"
          content={text}
          size="mini"
          onClick={action}
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
    this.setState({ allChecked: false }, TasksActionFactory.deleteCheckedTask );
  }

  private uncheckAllTasks = (): void => {
    this.setState({allChecked: false}, TasksActionFactory.uncheckAllTasks );
  }

  private checkAllTasks = (): void => {
    this.setState( {allChecked: true}, TasksActionFactory.checkAllTasks );
  }
}
