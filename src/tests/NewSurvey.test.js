import React from 'react'
import ReactDOM from 'react-dom'
import NewSurvey from '../layouts/NewSurvey'
import * as Survey from "survey-react";
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const match = { params: { id: '5d1b655ad01e83503e3a6e55' } }
  const div = document.createElement('div')
  ReactDOM.render(<NewSurvey match={match} />, div)
  ReactDOM.unmountComponentAtNode(div)
  
})


describe('NewSurvey', () => {
  it('should render correctly in "debug" mode', () => {
    // the id is for E1 4EY
  const match = { params: { id: '5d1b655ad01e83503e3a6e55' } }
    const component = shallow(<NewSurvey match={match} />)
    expect(component).toMatchSnapshot()
    expect(component.find(".surveyjs")).toHaveLength(1);
    expect(component.find("Survey")).toHaveLength(1);

    // expect(component.find(Survey).length).toEqual(1); 
    // expect(component.contains(<div className='nhsuk-expander-group' />)).to.equal(true);
  })
})