import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"
import {ConnectedLoginForm, LoginForm} from '../layouts/LoginPage'
import ReactDOM from 'react-dom'
import { baseUrl, authenticationUrl} from '../variables/URLs'
import { fireEvent } from '@testing-library/react';

const mockStore = configureMockStore();
const store = mockStore({});
const nock = require('nock')


describe('Login page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<Provider store={store}>
                    <ConnectedLoginForm />
                </Provider>)

    expect(component).toMatchSnapshot()
    expect(component.find('Connect(NHSHeader)')).toHaveLength(0);

  })

  it('should render correctly in mode', () => {
    const component = shallow(
                    <LoginForm />)

    expect(component).toMatchSnapshot()

  })

  it('should render correctly in mode', () => {
    const component = shallow(
                    <LoginForm />)

    expect(component.find('input').length).toEqual(2);

    component.find('input').first().simulate('change', { target: { value: "aaa" } })
    expect(component.state().Username).toEqual("aaa");

    component.find('input').at(1).simulate('change', { target: { value: "aaa" } })
    expect(component.state().Password).toEqual("aaa");


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

    // TODO

    // it('submit works', () => {
    //     let submit = jest.fn();
    //     // const wrapper = shallow(<LoginForm onSubmit={submit} />)  
    //     const wrapper = shallow(
    //                 <LoginForm onSubmit={submit} />)      
    //     wrapper.find("form").simulate("submit");
    //     expect(submit).toBeCalled()
    // })

})




// describe('When the form is submitted', () => {
//     let wrapper;
//     // our mock login function to replace the one provided by mapDispatchToProps
//     const mockLoginfn = jest.fn();
//     const initialState = {};

//     beforeEach(() => {
//         // pass the mock function as the login prop 
//         const newStore = configureMockStore(initialState)
//         const wrapper = shallow(<ConnectedLoginForm store={newStore}/>)
//         // wrapper = shallow(<Login handleLogin={mockLoginfn}/>)
//     })// ...tests here...

//     it('should call the mock login function', () => {
//     wrapper.find('form').simulate(
//        'submit', 
//        {preventDefault() {}}
//     )
//     expect(mockLoginfn.mock.calls.length).toBe(1)
//     })
// })




// const initialState = {}; // here it is possible to pass in any middleware if needed into //configureStore
// let wrapper;
// const mockLoginfn = jest.fn();

// beforeEach(() => {  //creates the store with any initial state or middleware needed  
//   const newStore = mockStore(initialState)
//   const wrapper = shallow(<ConnectedLoginForm store={newStore}/>)
//  })


// describe('When the form is submitted', () => {
//   it('should call the mock login function', () => {
//    const form = wrapper.find('form');

//    form.simulate(
//      'submit', 
//      {preventDefault() {}}
//    )
//    // wrapper.find('form').simulate(
//    //   'submit', 
//    //   {preventDefault() {}}
//    // )

//    expect(mockLoginfn.mock.calls.length).toBe(1)
//   })
// })





