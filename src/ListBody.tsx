import  * as React from 'react';
import {Container} from 'flux/utils';
import      {Task} from './index';
import ListItemRow from './ListItemRow';
import   TodoStore from './TodoStore';

import ReactCSSTransitionGroup = require('react-addons-css-transition-group');

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
      <ReactCSSTransitionGroup
        transitionName={{
          enter: 'in',
          leave: 'out'
        }}
        transitionEnterTimeout={450}
        transitionLeaveTimeout={450}
        component="div"
        role="list"
        className={`ui list animating transition slide`}
      >
        {this.state.tasks.map((task) => {
          return(
            <ListItemRow
              key={task.id}
              task={task}
            />
          );
        })}
      </ReactCSSTransitionGroup>
    );
  }
}

const ListBodyContainer = Container.create(ListBody);
export default ListBodyContainer;