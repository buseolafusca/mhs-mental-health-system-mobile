import React from 'react'
import ReactDOM from 'react-dom'
import SelectableTable from '../components/CheckedTable/CheckedTable'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  
  const component = shallow(<SelectableTable />)
  expect(component).toMatchSnapshot()

})
