import React from 'react'
import { shallow } from 'enzyme'
import LocationPage from '../layouts/LocationPage'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactDOM from 'react-dom'

describe('Location page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<LocationPage/>)

    expect(component).toMatchSnapshot()
  })
})


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LocationPage />, div)
  ReactDOM.unmountComponentAtNode(div)
  
})