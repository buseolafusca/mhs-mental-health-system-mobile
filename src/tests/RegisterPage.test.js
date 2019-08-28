import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"
import {RegisterPage, InnerRegisterPage} from '../layouts/RegisterPage'
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

  it('should render correctly in mode', () => {
    const component = shallow(<InnerRegisterPage/>)
    expect(component).toMatchSnapshot()
  })

    it('test inputs in mode', () => {
    const component = shallow(
                    <InnerRegisterPage />)

    expect(component.find('input').length).toEqual(7);

    component.find('input').at(0).simulate('change', { target: { name: "firstName", value: "firstName test" } })
    component.find('input').at(1).simulate('change', { target: { name: "lastName", value: "lastName test" } })
    component.find('input').at(2).simulate('change', { target: { name: "email", value: "email test" } })
    component.find('input').at(3).simulate('change', { target: { name: "postcode", value: "postcode test" } })
    component.find('input').at(4).simulate('change', { target: { name: "telephone", value: "telephone test" } })
    component.find('input').at(5).simulate('change', { target: { name: "password", value: "password test" } })
    component.find('input').at(6).simulate('change', { target: { name: "repeatedPassword", value: "repeatedPassword test" } })

    // console.log('wwwwwww')
    // console.log(component.state().user)
    expect(component.state().user.firstName).toEqual("firstName test");
    expect(component.state().user.lastName).toEqual("lastName test");
    expect(component.state().user.email).toEqual("email test");
    expect(component.state().user.postcode).toEqual("postcode test");
    expect(component.state().user.telephone).toEqual("telephone test");
    expect(component.state().user.password).toEqual("password test");
    expect(component.state().user.repeatedPassword).toEqual("repeatedPassword test");


  })


})

