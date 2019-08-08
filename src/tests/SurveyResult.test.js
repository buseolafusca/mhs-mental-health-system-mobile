import React from 'react'
import ReactDOM from 'react-dom'
import SurveyResult from '../layouts/SurveyResult'
import { shallow } from 'enzyme'

it('renders without crashing', () => {

  const match = { params: { id: '5d249a42a2a1c700307a85b0' } }
  const component = shallow(<SurveyResult match={match} />)
  expect(component).toMatchSnapshot()

})


it('renders without crashing', () => {
  const match = { params: { id: '5d249a42a2a1c700307a85b0' } }

  const div = document.createElement('div')
  ReactDOM.render(<SurveyResult match={match} />, div)
  ReactDOM.unmountComponentAtNode(div)
  
})

// const scope = nock(baseUrl + patientanswersUrl + '/' + '5d249a42a2a1c700307a85b0')
// .get()
// .reply(200,
//     { 
//         'data': {
//             'message': 'token sent',
//             'role': 'PATIENT',
//             'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDE3YWNjYTU3OTI0MGI0ODdjNTFkYSIsImlhdCI6MTU2NTE4OTM1NywiZXhwIjoxNTY1Nzk0MTU3fQ.nFJaZZHp67RjlCWQ1ViGuG64u4fUFuEyIrzvHe4tIS0' 
//         }
//     }
// )

