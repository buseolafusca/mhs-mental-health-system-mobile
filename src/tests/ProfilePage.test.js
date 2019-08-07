import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"
import {ProfilePage} from '../layouts/ProfilePage'

const mockStore = configureMockStore();
const store = mockStore({});

describe('Profile page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<Provider store={store}>
                    <ProfilePage />
                </Provider>)

    expect(component).toMatchSnapshot()

  })

})

