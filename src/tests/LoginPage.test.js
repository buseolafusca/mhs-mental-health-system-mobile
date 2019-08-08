import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"
import LoginForm from '../layouts/LoginPage'
import ReactDOM from 'react-dom'
import { baseUrl, authenticationUrl} from '../variables/URLs'

const mockStore = configureMockStore();
const store = mockStore({});
const nock = require('nock')

describe('Login page', () => {

  it('should render correctly in mode', () => {

    // const component = shallow(<SurveyCreator match={{ params: { id: '5d2f3dfd820884002fbabb40' }, isExact: true, path: '', url: '' }} />)


    const component = shallow(<Provider store={store}>
                    <LoginForm />
                </Provider>)

    expect(component).toMatchSnapshot()
    expect(component.find('Connect(NHSHeader)')).toHaveLength(0);

  })


  const scope = nock(baseUrl + authenticationUrl)
    .post('5d2f3dfd820884002fbabb41')
    .reply(200,
        { 
            'data': {
                'message': 'token sent',
                'role': 'PATIENT',
                'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDE3YWNjYTU3OTI0MGI0ODdjNTFkYSIsImlhdCI6MTU2NTE4OTM1NywiZXhwIjoxNTY1Nzk0MTU3fQ.nFJaZZHp67RjlCWQ1ViGuG64u4fUFuEyIrzvHe4tIS0' 
            }
        }
    )


    it('should render correctly', async () => {
        const component = shallow(<Provider store={store}>
                    <LoginForm match={{ params: {'email': 'aa', 'password': 'aa'}, isExact: true, path: '', url: '' }} />
                </Provider>)
        expect(component).toMatchSnapshot()
    })

})



 // LoginPage.js     |     6.67 |        0 |        0 |     6.67 |... 02,120,132,175 |



