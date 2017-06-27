import                  * as React from 'react';
import                    {Header} from 'semantic-ui-react';
import                    {Button} from 'semantic-ui-react';
import AppDispatcher, {AppActions} from './Dispatcher';

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

    AppDispatcher.getInstance().dispatch({
      eventName: AppActions.CHECK_ALL_TASKS,
      data: {
        id: '',
      }
    });
  }

  uncheckAllTasks(): void {
    this.setState({allChecked: false});

    AppDispatcher.getInstance().dispatch({
      eventName: AppActions.UNCHECK_ALL_TASKS,
      data: {
        id: '',
      }
    });
  }

  deleteChecked(): void {
    this.setState({allChecked: false});

    AppDispatcher.getInstance().dispatch({
      eventName: AppActions.DELETE_CHECKED_TASKS,
      data: {
        id: '',
      }
    });
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
