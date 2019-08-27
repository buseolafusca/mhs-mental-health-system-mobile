import React from 'react'
import { shallow, mount } from 'enzyme'
import LocationPage from '../layouts/LocationPage'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactDOM from 'react-dom'
import { getLocationByPostCodeUrl } from '../variables/URLs'
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom'


describe('Location page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<LocationPage/>)

    expect(component).toMatchSnapshot()
  })
})


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LocationPage />, div)
  ReactDOM.unmountComponentAtNode(div)
  
})


// test('invalid path should redirect to 404', () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={[ '/locationpage' ]}>
//       <LocationPage/>
//     </MemoryRouter>
//   );
//   // expect(wrapper.find('.SurveyResult1')).toHaveLength(1);
//   // expect(wrapper.find('.postcode')).toHaveLength(1);
//   // expect(wrapper.find('SurveyResult1')).toHaveLength(1);
//   expect(wrapper.find(Route)).toEqual(1);
// });


// it("onChange param is the same value as the input element's value property", () => {
//     const mockFn = jest.fn();
//     const input = shallow(<LocationPage handleChange={mockFn}/>);

//     input.find('input').simulate('change', {target: {value: 'matched'} });
//     expect(mockFn.mock.calls[0][0]).toBe('matched');
// });

 // LocationPage.js  |    35.71 |      100 |    33.33 |    35.71 |... 34,35,36,41,49 |

// describe('Test LocationPage willMount', () => {
//   beforeAll(() => {
    
//     nock(getLocationByPostCodeUrl)
//       .get()
//       .reply(200, {
//             'data': 1
//       });
//   });

//   it('Component fetching LandingPage from API', async (done) => {
//       const root = shallow(<LocationPage/>);
//       await waitUntil(() => root.state('questionnaireList') !== null);

      
//       // console.log("tttt")
//       // console.log(root.state)

//       // console.log(root.state())
//       // expect(root.state('questionnaireList')).toEqual([]);
//       expect(root.state('questionnaireList').length).toEqual(1);
//       done();
//   });
// });