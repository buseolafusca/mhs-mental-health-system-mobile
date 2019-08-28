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

  })
})


describe('PlacesPage', () => {
  it('should render correctly in "debug" mode', async () => {
    // the id is for E1 4EY
    const match = { params: {history:{length:25,action:"POP",location:{pathname:"/resources/51.51985,-0.05121/eat-drink",search:"",hash:"",key:"xdmfxd"}},location:{pathname:"/resources/51.51985,-0.05121/eat-drink",search:"",hash:"",key:"xdmfxd"},match:{path:"/resources/:id/:cat",url:"/resources/51.51985,-0.05121/eat-drink",isExact:true,params:{id:"51.51985,-0.05121",cat:"eat-drink"}}} }
    const component = await shallow(<PlacesPage match={match} />)
    expect(component).toMatchSnapshot()

  })
})

 // ResourcesPage.js |    10.53 |        0 |     9.38 |    10.64 |... 71,275,279,284 |


describe('SinglePlacePage', () => {
  it('should render correctly in "debug" mode', async () => {
    // the id is for E1 4EY
    // const match = { params: {history:{length:26,action:"PUSH",location:{pathname:"/resources/51.51985,-0.05121/eat-drink/Genesis Cinema",state:{detail:{position:[51.52078,-0.05129],distance:104,title:"Genesis Cinema",averageRating:0,category:{id:"cinema",title:"Cinema",href:"https://places.cit.api.here.com/places/v1/categories/places/cinema?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw",type:"urn:nlp-types:category",system:"places"},icon:"https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/32.icon",vicinity:"Mile End Road<br/>E1<br/>London<br/>E1 4",having:[],type:"urn:nlp-types:place",href:"https://places.cit.api.here.com/places/v1/places/826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58;context=Zmxvdy1pZD03ZjhhZDQ0OS03YzM5LTUxZTQtODJiMi1iNzQ3YTQ2NmZkNzVfMTU2NzAwMjg3MDE1Nl8wXzYwNDImcmFuaz0w?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw",id:"826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58",openingHours:{text:"Mon-Fri: 08:00 - 22:00<br/>Sat, Sun: 10:30 - 22:00",label:"Opening hours",isOpen:true,structured:[{start:"T080000",duration:"PT14H00M",recurrence:"FREQ:DAILY;BYDAY:MO,TU,WE,TH,FR"},{start:"T103000",duration:"PT11H30M",recurrence:"FREQ:DAILY;BYDAY:SA,SU"}]},alternativeNames:[{name:"Genesis Café",language:"en"}]}},search:"",hash:"",key:"6w7zp6"}},location:{pathname:"/resources/51.51985,-0.05121/eat-drink/Genesis Cinema",state:{detail:{position:[51.52078,-0.05129],distance:104,title:"Genesis Cinema",averageRating:0,category:{id:"cinema",title:"Cinema",href:"https://places.cit.api.here.com/places/v1/categories/places/cinema?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw",type:"urn:nlp-types:category",system:"places"},icon:"https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/32.icon",vicinity:"Mile End Road<br/>E1<br/>London<br/>E1 4",having:[],type:"urn:nlp-types:place",href:"https://places.cit.api.here.com/places/v1/places/826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58;context=Zmxvdy1pZD03ZjhhZDQ0OS03YzM5LTUxZTQtODJiMi1iNzQ3YTQ2NmZkNzVfMTU2NzAwMjg3MDE1Nl8wXzYwNDImcmFuaz0w?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw",id:"826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58",openingHours:{text:"Mon-Fri: 08:00 - 22:00<br/>Sat, Sun: 10:30 - 22:00",label:"Opening hours",isOpen:true,structured:[{start:"T080000",duration:"PT14H00M",recurrence:"FREQ:DAILY;BYDAY:MO,TU,WE,TH,FR"},{start:"T103000",duration:"PT11H30M",recurrence:"FREQ:DAILY;BYDAY:SA,SU"}]},alternativeNames:[{name:"Genesis Café",language:"en"}]}},search:"",hash:"",key:"6w7zp6"},match:{path:"/resources/:id/:cat/:place",url:"/resources/51.51985,-0.05121/eat-drink/Genesis Cinema",isExact:true,params:{id:"51.51985,-0.05121",cat:"eat-drink",place:"Genesis Cinema"}}} }
    const match = { params: {history:{length:26,action:"PUSH",location:{pathname:"/resources/51.51985,-0.05121/eat-drink/Genesis Cinema",state:{detail:{position:[51.52078,-0.05129],distance:104,title:"Genesis Cinema",averageRating:0,category:{id:"cinema",title:"Cinema",href:"https://places.cit.api.here.com/places/v1/categories/places/cinema?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw",type:"urn:nlp-types:category",system:"places"},icon:"https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/32.icon",vicinity:"Mile End Road<br/>E1<br/>London<br/>E1 4",having:[],type:"urn:nlp-types:place",href:"https://places.cit.api.here.com/places/v1/places/826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58;context=Zmxvdy1pZD03ZjhhZDQ0OS03YzM5LTUxZTQtODJiMi1iNzQ3YTQ2NmZkNzVfMTU2NzAwMjg3MDE1Nl8wXzYwNDImcmFuaz0w?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw",id:"826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58",openingHours:{text:"Mon-Fri: 08:00 - 22:00<br/>Sat, Sun: 10:30 - 22:00",label:"Opening hours",isOpen:true,structured:[{start:"T080000",duration:"PT14H00M",recurrence:"FREQ:DAILY;BYDAY:MO,TU,WE,TH,FR"},{start:"T103000",duration:"PT11H30M",recurrence:"FREQ:DAILY;BYDAY:SA,SU"}]},alternativeNames:[{name:"Genesis Café",language:"en"}]}},search:"",hash:"",key:"6w7zp6"}},location:{pathname:"/resources/51.51985,-0.05121/eat-drink/Genesis Cinema",state:{detail:{position:[51.52078,-0.05129],distance:104,title:"Genesis Cinema",averageRating:0,category:{id:"cinema",title:"Cinema",href:"https://places.cit.api.here.com/places/v1/categories/places/cinema?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw",type:"urn:nlp-types:category",system:"places"},icon:"https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/32.icon",vicinity:"Mile End Road<br/>E1<br/>London<br/>E1 4",having:[],type:"urn:nlp-types:place",href:"https://places.cit.api.here.com/places/v1/places/826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58;context=Zmxvdy1pZD03ZjhhZDQ0OS03YzM5LTUxZTQtODJiMi1iNzQ3YTQ2NmZkNzVfMTU2NzAwMjg3MDE1Nl8wXzYwNDImcmFuaz0w?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw",id:"826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58",openingHours:{text:"Mon-Fri: 08:00 - 22:00<br/>Sat, Sun: 10:30 - 22:00",label:"Opening hours",isOpen:true,structured:[{start:"T080000",duration:"PT14H00M",recurrence:"FREQ:DAILY;BYDAY:MO,TU,WE,TH,FR"},{start:"T103000",duration:"PT11H30M",recurrence:"FREQ:DAILY;BYDAY:SA,SU"}]},alternativeNames:[{name:"Genesis Café",language:"en"}]}},search:"",hash:"",key:"6w7zp6"},match:{path:"/resources/:id/:cat/:place",url:"/resources/51.51985,-0.05121/eat-drink/Genesis Cinema",isExact:true,params:{id:"51.51985,-0.05121",cat:"eat-drink",place:"Genesis Cinema"}}} }
    
    const location = {pathname:"/resources/51.51985,-0.05121/eat-drink/Genesis Cinema",state:{detail:{position:[51.52078,-0.05129],distance:104,title:"Genesis Cinema",averageRating:0,category:{id:"cinema",title:"Cinema",href:"https://places.cit.api.here.com/places/v1/categories/places/cinema?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw",type:"urn:nlp-types:category",system:"places"}}}}
    // const match = {params: {"history":{"length":26,"action":"PUSH","location":{"pathname":"/resources/51.51985,-0.05121/eat-drink/Genesis Cinema","state":{"detail":{"position":[51.52078,-0.05129],"distance":104,"title":"Genesis Cinema","averageRating":0,"category":{"id":"cinema","title":"Cinema","href":"https://places.cit.api.here.com/places/v1/categories/places/cinema?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw","type":"urn:nlp-types:category","system":"places"},"icon":"https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/32.icon","vicinity":"Mile End Road<br/>E1<br/>London<br/>E1 4","having":[],"type":"urn:nlp-types:place","href":"https://places.cit.api.here.com/places/v1/places/826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58;context=Zmxvdy1pZD03ZjhhZDQ0OS03YzM5LTUxZTQtODJiMi1iNzQ3YTQ2NmZkNzVfMTU2NzAwMjg3MDE1Nl8wXzYwNDImcmFuaz0w?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw","id":"826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58","openingHours":{"text":"Mon-Fri: 08:00 - 22:00<br/>Sat, Sun: 10:30 - 22:00","label":"Opening hours","isOpen":true,"structured":[{"start":"T080000","duration":"PT14H00M","recurrence":"FREQ:DAILY;BYDAY:MO,TU,WE,TH,FR"},{"start":"T103000","duration":"PT11H30M","recurrence":"FREQ:DAILY;BYDAY:SA,SU"}]},"alternativeNames":[{"name":"Genesis Café","language":"en"}]}},"search":"","hash":"","key":"6w7zp6"}},"location":{"pathname":"/resources/51.51985,-0.05121/eat-drink/Genesis Cinema","state":{"detail":{"position":[51.52078,-0.05129],"distance":104,"title":"Genesis Cinema","averageRating":0,"category":{"id":"cinema","title":"Cinema","href":"https://places.cit.api.here.com/places/v1/categories/places/cinema?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw","type":"urn:nlp-types:category","system":"places"},"icon":"https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/32.icon","vicinity":"Mile End Road<br/>E1<br/>London<br/>E1 4","having":[],"type":"urn:nlp-types:place","href":"https://places.cit.api.here.com/places/v1/places/826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58;context=Zmxvdy1pZD03ZjhhZDQ0OS03YzM5LTUxZTQtODJiMi1iNzQ3YTQ2NmZkNzVfMTU2NzAwMjg3MDE1Nl8wXzYwNDImcmFuaz0w?app_id=nuT8ftiOYvrfFNaFEUyV&app_code=yNZIQaMP6fRuY1D8DKsuxw","id":"826gcpvk-ef3fe1d37e5c42ca9813492f6a7cce58","openingHours":{"text":"Mon-Fri: 08:00 - 22:00<br/>Sat, Sun: 10:30 - 22:00","label":"Opening hours","isOpen":true,"structured":[{"start":"T080000","duration":"PT14H00M","recurrence":"FREQ:DAILY;BYDAY:MO,TU,WE,TH,FR"},{"start":"T103000","duration":"PT11H30M","recurrence":"FREQ:DAILY;BYDAY:SA,SU"}]},"alternativeNames":[{"name":"Genesis Café","language":"en"}]}},"search":"","hash":"","key":"6w7zp6"},"match":{"path":"/resources/:id/:cat/:place","url":"/resources/51.51985,-0.05121/eat-drink/Genesis Cinema","isExact":true,"params":{"id":"51.51985,-0.05121","cat":"eat-drink","place":"Genesis Cinema"}}}}
    const component = await shallow(<SinglePlacePage match={match} location={location}/>)
    expect(component).toMatchSnapshot()

  })
})


