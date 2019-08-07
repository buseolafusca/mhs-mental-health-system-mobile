import React from 'react'
import ReactDOM from 'react-dom'
import SurveyResult from '../layouts/SurveyResult'
import { shallow } from 'enzyme'

it('renders without crashing', () => {

  const match = { params: { id: '5d4abc0139a0a411900f7b42' } }
  const component = shallow(<SurveyResult match={match} />)
  expect(component).toMatchSnapshot()

})
