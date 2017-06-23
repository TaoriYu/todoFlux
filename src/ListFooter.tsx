import * as React from 'react';
import {Header} from 'semantic-ui-react';

interface ListFooterProps {}
interface ListFooterState {}

export default class ListFooter extends React.PureComponent<ListFooterProps, ListFooterState> {
  render() {
    return(
      <div>
        <Header dividing/>
        Some footer here
      </div>
    );
  }
}
