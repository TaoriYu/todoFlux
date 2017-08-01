import * as React from 'react';
import {shallow} from 'enzyme';
import {ListBody} from '../../ListBody';

describe('ListBody', () => {
  test('renders with three initial tasks', () => {
    let header = shallow(<ListBody/>);
    expect(header.state().tasks.length).toEqual(3);
  });
});
