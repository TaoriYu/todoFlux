import  * as React from 'react';
import {Container} from 'flux/utils';
import ListItemRow from './ListItemRow';
import TodoStore from '../stores/TodoStore';
import {ITask} from '../types/tasks';
import List from 'semantic-ui-react/dist/commonjs/elements/List/List';

interface IListBodyProps {
}

interface IListBodyStates {
  tasks: Array<ITask>;
}

export class ListBody extends React.PureComponent<IListBodyProps, IListBodyStates> {

  static getStores() {
    return [TodoStore.getInstance()];
  }

  static calculateState(): IListBodyStates {
    return {
      tasks: TodoStore.getInstance().getState(),
    };
  }

  constructor(props: {}) {
    super(props);

    this.state = {
      tasks: TodoStore.getInstance().getState(),
    };
  }

  render() {
    return(
      <List>
        {this.state.tasks.map(task => <ListItemRow key={task.id} task={task} />)}
      </List>
    );
  }
}

const ListBodyContainer = Container.create(ListBody);
export default ListBodyContainer;