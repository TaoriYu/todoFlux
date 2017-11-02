import * as React from 'react';
import {Container, Segment} from 'semantic-ui-react';
import ListHeader from './ListHeader';
import ListBody from './ListBody';
import ListFooter from './ListFooter';

interface AppProps {}
interface AppStates {}

class App extends React.PureComponent<AppProps, AppStates> {
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
