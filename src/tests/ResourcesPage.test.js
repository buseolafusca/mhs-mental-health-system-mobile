import React from 'react'
import { shallow } from 'enzyme'
import { ResourcesPage, SinglePlacePage, PlacesPage } from '../layouts/ResourcesPage'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactDOM from 'react-dom'

// describe('<ResourcesPage />', () => {
//   it('renders three <Foo /> components', () => {
//     const match = { params: { id: 'aaa' } }
//     const wrapper = shallow(<ResourcesPage match={match} />);
//     expect(wrapper.find('nhsuk-expander-group')).to.have.lengthOf(1);
//   });


//   // it('renders an `.icon-star`', () => {
//   //   const wrapper = shallow(<MyComponent />);
//   //   expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
//   // });

//   // it('renders children when passed in', () => {
//   //   const wrapper = shallow((
//   //     <MyComponent>
//   //       <div className="unique" />
//   //     </MyComponent>
//   //   ));
//   //   expect(wrapper.contains(<div className="unique" />)).to.equal(true);
//   // });

//   // it('simulates click events', () => {
//   //   const onButtonClick = sinon.spy();
//   //   const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
//   //   wrapper.find('button').simulate('click');
//   //   expect(onButtonClick).to.have.property('callCount', 1);
//   // });
// });

it('renders without crashing', () => {
  const div = document.createElement('div')
  const match = { params: { id: 'aaa' } }
  ReactDOM.render(<ResourcesPage match={match} />, div)
  ReactDOM.unmountComponentAtNode(div)
  
})


describe('ResourcesPage', () => {
  it('should render correctly in "debug" mode', async () => {
    // the id is for E1 4EY
    const match = { params: { id: 'aaa' } }
    const component = await shallow(<ResourcesPage match={match} />)
    expect(component).toMatchSnapshot()
    expect(component.find(SinglePlacePage).length).toEqual(0); 
    expect(component.state().categoriesList).toEqual([]);


    // expect(component.contains(<div className='nhsuk-expander-group' />)).to.equal(true);
  })
})
// describe('SinglePlacePage', () => {
//   it('should render correctly in "debug" mode', () => {
//     const component = shallow(<SinglePlacePage  />)

//     expect(component).toMatchSnapshot()
//   })
// })
// describe('PlacesPage', () => {
//   it('should render correctly in "debug" mode', () => {
//     const component = shallow(<PlacesPage  />)

//     expect(component).toMatchSnapshot()
//   })
// })
