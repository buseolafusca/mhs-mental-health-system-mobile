import React from 'react'
import ReactDOM from 'react-dom'
import LandingPage from '../layouts/LandingPage'
import * as Survey from "survey-react";
import { shallow } from 'enzyme'
// import { cleanup, render } from 'react-testing-library'

describe('Landing page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<LandingPage/>)

    expect(component).toMatchSnapshot()
    expect(component.find("Square")).toHaveLength(6);
  })


  // it('attaches the correct class name to the label\'s class name', () => {
  //   const { getByText } = render(<LandingPage />)
  //   const label = getByText(LandingPage.labelText)
    
  //   expect(label.className).toEqual(defaultProps.labelClassName)
  // })


})


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LandingPage />, div)
  ReactDOM.unmountComponentAtNode(div)
  
})

 // LandingPage.js   |       50 |        0 |    66.67 |       50 |    31,32,33,34,47 |


