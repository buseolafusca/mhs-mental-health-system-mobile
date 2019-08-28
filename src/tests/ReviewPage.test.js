import React from 'react'
import { shallow } from 'enzyme'
import ReviewPage from '../layouts/ReviewPage'
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from 'react-dom'
import { baseUrl, answersUrl } from '../variables/URLs'
import waitUntil from 'async-wait-until';
const nock = require('nock')

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const wrapper = shallow(<ReviewPage />);
  return {
    wrapper,
  };
};

describe('Test ReviewPage willMount', () => {
  beforeAll(() => {
    
    nock(baseUrl)
      .get(answersUrl)
      .reply(200, {
          'data': [{"status":"PENDING","_id":"5d665fc266b7c966cfbc53f5","role":"FORM1ANSWER","title":"Form 1: digital IAPT working group","service_id":"5d5e5ba018bc1dfa93210934","score":0,"body":{"question1":"aa","question2":"aa","question4":"aa","question3":"aa","question6":"aa","question5":"item1","question7":"E1 4EY","question13":"7517143749","question14":"item1","question15":"a","question16":"item2","question11":"chngdada@gmail.com","question12":"item1","question9":"item2","question8":"adsda","question17":"item2"},"questionnaireBody":{"title":"Form 1: digital IAPT working group","description":"To make an online self-referral to London IAPT services.","pages":[{"name":"Page 1","elements":[{"type":"text","name":"question1","title":"First name","isRequired":true},{"type":"text","name":"question2","title":"Surname (family name)","isRequired":true},{"type":"text","name":"question4","title":"Date of Birth","isRequired":true,"inputType":"date"},{"type":"text","name":"question3","title":"Name of GP surgery","isRequired":true,"hint":"Please provide the name of your GP surgery."},{"type":"dropdown","name":"question5","title":"Gender","isRequired":true,"choices":[{"value":"item1","text":"Male "},{"value":"item2","text":"Female"},{"value":"item3","text":"Not specified"}]},{"type":"text","name":"question6","title":"Address","isRequired":true,"maxLength":7},{"type":"text","name":"question7","title":"Postcode","isRequired":true,"size":7,"maxLength":7},{"type":"text","name":"question13","title":"Mobile telephone number","inputType":"tel"},{"type":"radiogroup","name":"question14","visibleIf":"{question13} notempty","title":"Can we leave a voicemail on this number?","choices":[{"value":"item1","text":"Yes"},{"value":"item2","text":"No"}]},{"type":"text","name":"question15","title":"Home telephone number","inputType":"tel"},{"type":"radiogroup","name":"question16","visibleIf":"{question15} notempty","title":"Can we leave a voicemail on this number?","choices":[{"value":"item1","text":"Yes"},{"value":"item2","text":"No"}]},{"type":"text","name":"question11","title":"Email address","validators":[{"type":"email"}],"inputType":"email"},{"type":"radiogroup","name":"question12","title":"What is your preferred language or languages for speaking?","hasOther":true,"choices":[{"value":"item1","text":"English"}],"otherText":"Other (please list)"},{"type":"radiogroup","name":"question18","visibleIf":"{question12} = \"other\"","title":"Will you require an interpreter?","choices":[{"value":"item1","text":"Yes"},{"value":"item2","text":"No"}]},{"type":"html","name":"question19"}],"title":"Self-referral form","description":"This is a referral form to make a referral to NHS psychological therapy services.\nThis form will be sent to your local service to manage your enquiry.\n\nInformation you provide will be stored securely by the NHS service in your local area.  If for any reason you are not able to complete this form please contact your local service for assistance (link to nhs.uk IAPT finder)\n\nThis first page of the form is asking for information about who you are, where you live and how we can contact you. "},{"name":"Page 2","elements":[{"type":"panel","name":"Introduction","elements":[{"type":"html","name":"question21","html":"In this section of the form we would like to know a bit more about what you are looking for help with. Please answer in as much detail as you feel comfortable with. <br>\n<br>\nInformation you provide will be stored securely by the NHS service in your local area. If for any reason you are not able to complete this form please contact your local service for assistance and advice."}],"title":"Understanding what you are looking for help with"},{"type":"text","name":"question8","title":"What do you need support with at this time?","isRequired":true},{"type":"radiogroup","name":"question9","title":"Are you receiving help currently for your mental health (e.g. stress, anxiety, depression, low mood)?","choices":[{"value":"item1","text":"Yes"},{"value":"item2","text":"No"},{"value":"item3","text":"I do not wish to state"}]},{"type":"comment","name":"question10","visibleIf":"{question9} = \"item1\"","title":"Please provide details below:"},{"type":"radiogroup","name":"question17","title":"How did you find out about this service?","hasOther":true,"choices":[{"value":"item1","text":"Word of mouth"},{"value":"item2","text":"NHS.uk website"},{"value":"item3","text":"Good Thinking website"},{"value":"item4","text":"GP or other health professional "}]}],"title":"Self-referral form"}],"showPrevButton":false,"showQuestionNumbers":"off","showProgressBar":"bottom"},"rules":{"RED":[],"GREEN":[]},"patient_id":"5d63c07c66b7c966cfbc53f1","createdAt":"2019-08-28T11:04:34.129Z","updatedAt":"2019-08-28T11:04:34.129Z","band":"RED","__v":0}]
      });
  });

  // it('Component fetching ReviewPage from API', async (done) => {
  //     const root = shallow(<ReviewPage/>);
  //     await waitUntil(() => root.state('userAnswers') !== null);
  //     expect(root.state('userAnswers').length).toEqual(1);
  //     done();
  // });
});

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

