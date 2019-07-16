import React from 'react'
import { shallow } from 'enzyme'
import { ResourcesPage, SinglePlacePage, PlacesPage } from '../layouts/ResourcesPage'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


describe('ResourcesPage', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<ResourcesPage />)

    expect(component).toMatchSnapshot()
  })
})
describe('SinglePlacePage', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<SinglePlacePage  />)

    expect(component).toMatchSnapshot()
  })
})
describe('PlacesPage', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<PlacesPage  />)

    expect(component).toMatchSnapshot()
  })
})
