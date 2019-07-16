import React from 'react'
import ReactDOM from 'react-dom'
import NewSurvey from '../layouts/NewSurvey'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NewSurvey />, div)
  ReactDOM.unmountComponentAtNode(div)
})
