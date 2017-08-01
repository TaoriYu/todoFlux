import * as React from 'react';
import {shallow} from 'enzyme';
import {Checkbox} from 'semantic-ui-react';
import renderer = require('react-test-renderer');

describe('Checkbox component', () => {
  test('basic snapshot render', () => {
    const checkbox = renderer.create(
      <div>
        <Checkbox>If life is easy then what is this?</Checkbox>
        <Checkbox label="So look into my eyes and see the bull's eye and the crack"/>
      </div>
    );

    let tree = checkbox.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onclick Checkbox', () => {
    const checkbox = shallow(
      <Checkbox>Afraid to talk but is hard to catch</Checkbox>
    );

    checkbox.simulate('click');
    expect(checkbox.find('.ui.checkbox').props().className).toEqual('ui checked fitted checkbox');
    checkbox.find('.ui.checkbox').simulate('click');
    expect(checkbox.find('.ui.checkbox').props().className).toEqual('ui fitted checkbox');
  });
});
