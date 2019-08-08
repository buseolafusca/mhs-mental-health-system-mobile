import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"
import RegisterPage from '../layouts/RegisterPage'
import SelectableTable from '../components/CheckedTable/CheckedTable.js'

const mockStore = configureMockStore();
const store = mockStore({});

describe('Register page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<Provider store={store}>
                    <RegisterPage />
                </Provider>)
    expect(component).toMatchSnapshot()
  })

  it('should render correctly in mode', () => {
    const component = shallow(<SelectableTable/>)
    expect(component).toMatchSnapshot()
  })

 // RegisterPage.js  |     6.45 |        0 |        0 |     6.45 |... 83,84,93,94,95 |


})

