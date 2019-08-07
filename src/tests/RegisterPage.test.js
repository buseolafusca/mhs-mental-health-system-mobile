import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"
import RegisterPage from '../layouts/RegisterPage'

const mockStore = configureMockStore();
const store = mockStore({});

describe('Register page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<Provider store={store}>
                    <RegisterPage />
                </Provider>)

    expect(component).toMatchSnapshot()

  })

})

