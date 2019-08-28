import React from 'react'
import ReactDOM from 'react-dom'
import LandingPage from '../layouts/LandingPage'
import { shallow, mount } from 'enzyme'
import { baseUrl, fetchQuestionnaireUrl } from '../variables/URLs'
import waitUntil from 'async-wait-until';

const nock = require('nock')


describe('Test LandingPage willMount', () => {
  beforeAll(() => {
    nock(baseUrl)
      .get(fetchQuestionnaireUrl)
      .reply(200, {
          'data': [{"_id":"5d5e5bb6a4f2bafa94ac15d9","title":"Triage Form","description":"Please complete the form below","is_published":true,"is_public":true,"body":{"title":"Triage Form","description":"Please complete the form below","pages":[{"name":"page1","elements":[{"type":"text","name":"question1","title":"Your First Name"},{"type":"text","name":"question2","title":"1.  Your Surname"},{"type":"dropdown","name":"question3","title":"Your Gender","choices":[{"value":"item1","text":"Male"},{"value":"item2","text":"Female"},{"value":"item3","text":"Transgerer"}]},{"type":"text","name":"question5","title":"Your Date of Birth"},{"type":"text","name":"question7","title":"Your address"},{"type":"dropdown","name":"question6","title":"The GP with whom you are registered","choices":["item1","item2","item3"]},{"type":"dropdown","name":"question8","title":"Your preferred method of contact","choices":[{"value":"item1","text":"Post"},{"value":"item2","text":"Email"},{"value":"item3","text":"Text"},{"value":"item4","text":"Phone (including its answer machine)"}]},{"type":"text","name":"question18","title":"Details of your preferred method of contact"},{"type":"checkbox","name":"question9","title":"We need to know about your thoughts and feelings to understand how we can help you.  Have you constantly felt you cannot control any of the feelings below over the past two weeks","choices":[{"value":"item1","text":"Being Low / Depressed"},{"value":"item2","text":"Anxiety"},{"value":"item3","text":"Panic"},{"value":"item4","text":"Negative thoughts"},{"value":"item5","text":"Negative impluses"}]},{"type":"comment","name":"question4","title":"What thoughts or actions do you feel may be triggering you to feel this way?"},{"type":"checkbox","name":"question15","title":"Do you think that recent changes in any of the following life pressures is triggering your feelings?","choices":[{"value":"item1","text":"A death in your family"},{"value":"item2","text":"An increasing demand on you to look after another person(s)"},{"value":"item4","text":"A housing problem"},{"value":"item5","text":"An employment related problem"},{"value":"item6","text":"A crime committed against you (including domestic abuse)"},{"value":"item7","text":"A pregnancy"},{"value":"item8","text":"The need to look after one or more children under the age of 1"},{"value":"item9","text":"Dependancy on alchohol"},{"value":"item10","text":"Dependancy on street drugs"},{"value":"item11","text":"Dependancy on nicotine"}]},{"type":"comment","name":"question10","title":"What are you doing to help you cope with these feelings?"},{"type":"comment","name":"question11","title":"How are these feelings affecting your life?"},{"type":"checkbox","name":"question12","title":"If these feelings did not exist, what would could you enjoy that you do not enjoy now","choices":[{"value":"item1","text":"A working life"},{"value":"item2","text":"A family life"},{"value":"item3","text":"A Social & Leisure life"},{"value":"item4","text":"A Private life"},{"value":"item5","text":"Close relationships"}]},{"type":"checkbox","name":"question13","title":"To understand who to signpost you to it would be helpful to understand if you have been diagnosed as any of the following: ","choices":[{"value":"item1","text":"Long term physical health issues"},{"value":"item2","text":"Long term mental health issues"}]},{"type":"comment","name":"question14","title":"If you have a long term condition please provide more details, including and any therapy or medication that have been prescribed for you?"},{"type":"matrix","name":"question16","title":"How often have you been bothered by the following over the past two weeks (leave blank if the answer is not at all)","columns":[{"value":"item1_1","text":"Several days"},{"value":"item2_2","text":"More that half of the days"},{"value":"item3_3","text":"Nearly every day"}],"rows":["Feeling anxious","Uncontrollable worry","Worrying about differing things","An inability to relax","An inability to sit still","Being easily annoyed/Irritated","Afraid something awful will happen"]},{"type":"checkbox","name":"question17","title":"As you may expect, we are required to understand if you are at immediate risk to yourself or others.  Please pardon the directness of these questions.  Please tick the following if they true.","choices":[{"value":"item1_1","text":"Over the past 4 weeks have things got so bad that I have had thoughts about physically hurting myself or others.  "},{"value":"item2_1","text":"I have made plans to act upon these thoughts"},{"value":"item3_1","text":"I have acted upon such plans in the past"}]}]}]},"role":"FORM1","rules":{"RED":[],"GREEN":[]},"__v":0}]
      });
  });

  // it('Component fetching LandingPage from API', async (done) => {
  //     const root = shallow(<LandingPage/>);
  //     await waitUntil(() => root.state('questionnaireList') !== null);

  //     expect(root.state('questionnaireList').length).toEqual(1);
  //     done();
  // });
});

describe('LandingPage', () => {
  it('should render correctly in mode', () => {
    const component = shallow(<LandingPage/>)

    expect(component).toMatchSnapshot()
    expect(component.find("Square")).toHaveLength(4);
    
  })

})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LandingPage />, div)
  ReactDOM.unmountComponentAtNode(div)
  
})

test('calls `componentWillMount` before rendering', () => {
  const onWillMount = jest.fn();
  LandingPage.prototype.componentWillMount = onWillMount;
  mount(<LandingPage />);

  expect(onWillMount).toBeCalled();
});

// const scope = nock(baseUrl + fetchQuestionnaireUrl)
//     .get('5d2f3dfd820884002fbabb41')
//     .reply(200,
//         { 
//             'data': {
//                 'message': 'token sent',
//                 'role': 'PATIENT',
//                 'data': 17
//             }
//         }
//     )
