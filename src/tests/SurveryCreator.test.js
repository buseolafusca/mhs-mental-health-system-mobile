import React from 'react'
import { shallow } from 'enzyme'
import Creator from '../layouts/SurveyCreator'

describe('Location page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<Creator/>)
    expect(component).toMatchSnapshot()
  })
})
