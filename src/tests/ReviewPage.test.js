import React from 'react'
import { shallow } from 'enzyme'
import ReviewPage from '../layouts/ReviewPage'
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });



const setup = () => {
  const wrapper = shallow(<ReviewPage />);
  return {
    wrapper,
  };
};

it('should has table', () => {
  const { wrapper } = setup();
  expect(wrapper.find('#get-table')).toHaveLength(1);
});

it("renders without crashing", () => {
  mount(
    <MemoryRouter>
      <ReviewPage />
    </MemoryRouter>
  );
});

// it('calls component handleTest', () => {
//   const { wrapper } = setup();
//   const spyFunction = jest.spyOn(wrapper.instance(), 'addRowHandlers');
//   wrapper.instance().addRowHandlers();
//   expect(spyFunction).toHaveBeenCalled();
//   spyFunction.mockRestore();
// });


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

