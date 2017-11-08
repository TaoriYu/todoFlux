import * as React             from 'react';
import * as List              from './List';
import {
  Container,
  Segment,
  Dimmer,
  Loader
}                             from 'semantic-ui-react';
import TasksActions           from '../actions/TasksActionFactory';
import AccessorIDB            from '../api/AccessorIDB';

interface IAppProps {}
interface IAppStates {
  loading: boolean;
}

class App extends React.PureComponent<IAppProps, IAppStates> {
  state: IAppStates = {
    loading: true
  };

  componentDidMount() {
    AccessorIDB.open().then(() =>
      TasksActions.getTasks(() =>
        this.setState({loading: false})
      )
    );
  }

  render() {
    const Component = this.state.loading ? AppLoader : Main;
    return <Component/>;
  }
}

function AppLoader() {
  return (
    <Dimmer active page>
      <Loader/>
    </Dimmer>
  );
}

function Main() {
  return (
    <Container text>
      <Segment piled>
        <List.Header/>
        <List.BodyContainer />
        <List.Footer/>
      </Segment>
    </Container>
  );
}
export default App;
