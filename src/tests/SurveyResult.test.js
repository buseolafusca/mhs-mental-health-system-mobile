import React from 'react'
import ReactDOM from 'react-dom'
import SurveyResult from '../layouts/SurveyResult'
import { shallow } from 'enzyme'

it('renders without crashing', () => {

  const match = { params: { id: '5d249a42a2a1c700307a85b0' } }
  const component = shallow(<SurveyResult match={match} />)
  expect(component).toMatchSnapshot()

})
