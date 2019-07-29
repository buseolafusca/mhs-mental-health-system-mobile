import React from 'react'
import { shallow } from 'enzyme'
import ReviewPage from '../layouts/ReviewPage'

describe('Review page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<ReviewPage/>)

    expect(component).toMatchSnapshot()
  })

  it('renders an `#get-table`', () => {
    const wrapper = shallow(<ReviewPage />);
    expect(wrapper.find('#get-table')).toHaveLength(1);
  });
})
