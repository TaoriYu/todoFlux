import * as React from 'react';
import {Container, Segment} from 'semantic-ui-react';
import ListHeader from './ListHeader';
import ListBody from './ListBody';
import ListFooter from './ListFooter';

interface IAppProps {}
interface IAppStates {}

class App extends React.PureComponent<IAppProps, IAppStates> {
  render() {
    return (
      <Container text>
        <Segment piled>
          <ListHeader/>
          <ListBody />
          <ListFooter/>
        </Segment>
      </Container>
    );
  }
}

export default App;
