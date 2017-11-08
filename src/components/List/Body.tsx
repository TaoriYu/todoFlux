import  * as React   from 'react';
import { Container } from 'flux/utils';
import ListItemRow   from './ItemRow';
import TodoStore     from '../../stores/TodoStore';
import { ITask }     from '../../types/tasks';
import List          from 'semantic-ui-react/dist/commonjs/elements/List/List';

interface IBodyProps {}

interface IBodyStates {
  tasks: Array<ITask>;
}

export class Body extends React.Component<IBodyProps, IBodyStates> {

  state: IBodyStates = {
    tasks: TodoStore.getState(),
  };

  static getStores() {
    return [TodoStore];
  }

  static calculateState(): IBodyStates {
    return {
      tasks: TodoStore.getState(),
    };
  }

  render() {
    const {tasks} = this.state;
    return(
      <List>
        {tasks.map(task => <ListItemRow key={task.id} task={task} />)}
      </List>
    );
  }
}

export default Container.create(Body);