import * as React  from 'react';
import {List}      from 'semantic-ui-react';
import {Task}      from './index';
import {Container} from 'flux/utils';
import ListItemRow from './ListItemRow';
import TodoStore   from './TodoStore';
// import AppDispatcher, {AppActions} from './Dispatcher';
// import generateID from './generateID';
// import AppDispatcher, {AppActions} from "./Dispatcher";

interface ListBodyStates {
  tasks: Array<Task>;
}

export class ListBody extends React.PureComponent<{}, ListBodyStates> {
  static getStores() {
    return [TodoStore.getInstance()];
  }

  static calculateState(): ListBodyStates {
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
        {this.state.tasks.map((task) => {
          return(
            <ListItemRow
              key={task.id}
              task={task}
            />
          );
        })}
      </List>
    );
  }
}

const ListBodyContainer = Container.create(ListBody);
export default ListBodyContainer;