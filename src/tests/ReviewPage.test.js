import React from 'react'
import { shallow } from 'enzyme'
import ReviewPage from '../layouts/ReviewPage'
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from 'react-dom'

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  mount(
    <MemoryRouter>
      <ReviewPage />
    </MemoryRouter>
  );
});


describe('Review page', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<ReviewPage/>)

    expect(component).toMatchSnapshot()
  })

  it('renders an `#get-table`', () => {
    const wrapper = shallow(<ReviewPage />);
    expect(wrapper.find('#get-table')).toHaveLength(1);
  });
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ReviewPage />, div)
  ReactDOM.unmountComponentAtNode(div)
  
})

  // ReviewPage.js                                     |       16 |      100 |     37.5 |    17.39 |... 43,44,45,47,51 |

