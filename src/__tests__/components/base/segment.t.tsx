import * as React from 'react';
import renderer = require('react-test-renderer');
import {Segment} from 'semantic-ui-react';

describe('Segment component', () => {
  test('basic segment snapshot', () => {
    expect(renderer.create(<Segment>I'm full well aware</Segment>).toJSON()).toMatchSnapshot();
  });
});