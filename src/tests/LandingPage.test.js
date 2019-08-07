import React from 'react'
import ReactDOM from 'react-dom'
import LandingPage from '../layouts/LandingPage'
import * as Survey from "survey-react";
import { shallow } from 'enzyme'

describe('Landing page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<LandingPage/>)

    expect(component).toMatchSnapshot()
    expect(component.find("Square")).toHaveLength(5);
  })
})


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LandingPage />, div)
  ReactDOM.unmountComponentAtNode(div)
  
})


