import React from 'react'
import ReactDOM from 'react-dom'
import SurveyResult from '../layouts/SurveyResult'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SurveyResult />, div)
  ReactDOM.unmountComponentAtNode(div)
})
