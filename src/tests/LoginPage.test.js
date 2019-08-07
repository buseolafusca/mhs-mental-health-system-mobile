import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"
import LoginForm from '../layouts/LoginPage'

const mockStore = configureMockStore();
const store = mockStore({});

describe('Login page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<Provider store={store}>
                    <LoginForm />
                </Provider>)

    expect(component).toMatchSnapshot()

  })

})

