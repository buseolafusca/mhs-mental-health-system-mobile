import React from 'react'
import { shallow } from 'enzyme'
import LocationPage from '../layouts/LocationPage'
import { configure } from 'enzyme'
import './SetupTests'
import Adapter from 'enzyme-adapter-react-16'

describe('Location page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<LocationPage/>)

    expect(component).toMatchSnapshot()
  })
})
