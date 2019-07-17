import React from 'react'
import ReactDOM from 'react-dom'
import NewSurvey from '../layouts/NewSurvey'


it('renders without crashing', () => {
  const match = { params: { id: '5d1b655ad01e83503e3a6e55' } }
  const div = document.createElement('div')
  ReactDOM.render(<NewSurvey match={match} />, div)
  ReactDOM.unmountComponentAtNode(div)
  
})
