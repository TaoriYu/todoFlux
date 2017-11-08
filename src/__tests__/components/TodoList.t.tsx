import * as React from 'react';
import {shallow} from 'enzyme';
import {Body} from '../../components/List/Body';

describe('Body', () => {
  test('renders with three initial tasks', () => {
    let header = shallow(<Body/>);
    expect(header.state().tasks.length).toEqual(3);
  });
});
