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
          // 'data': [{"_id":"5d5e5bb6a4f2bafa94ac15d9","title":"Triage Form","description":"Please complete the form below","is_published":true,"is_public":true,"body":{"title":"Triage Form","description":"Please complete the form below","pages":[{"name":"page1","elements":[{"type":"text","name":"question1","title":"Your First Name"},{"type":"text","name":"question2","title":"1.  Your Surname"},{"type":"dropdown","name":"question3","title":"Your Gender","choices":[{"value":"item1","text":"Male"},{"value":"item2","text":"Female"},{"value":"item3","text":"Transgerer"}]},{"type":"text","name":"question5","title":"Your Date of Birth"},{"type":"text","name":"question7","title":"Your address"},{"type":"dropdown","name":"question6","title":"The GP with whom you are registered","choices":["item1","item2","item3"]},{"type":"dropdown","name":"question8","title":"Your preferred method of contact","choices":[{"value":"item1","text":"Post"},{"value":"item2","text":"Email"},{"value":"item3","text":"Text"},{"value":"item4","text":"Phone (including its answer machine)"}]},{"type":"text","name":"question18","title":"Details of your preferred method of contact"},{"type":"checkbox","name":"question9","title":"We need to know about your thoughts and feelings to understand how we can help you.  Have you constantly felt you cannot control any of the feelings below over the past two weeks","choices":[{"value":"item1","text":"Being Low / Depressed"},{"value":"item2","text":"Anxiety"},{"value":"item3","text":"Panic"},{"value":"item4","text":"Negative thoughts"},{"value":"item5","text":"Negative impluses"}]},{"type":"comment","name":"question4","title":"What thoughts or actions do you feel may be triggering you to feel this way?"},{"type":"checkbox","name":"question15","title":"Do you think that recent changes in any of the following life pressures is triggering your feelings?","choices":[{"value":"item1","text":"A death in your family"},{"value":"item2","text":"An increasing demand on you to look after another person(s)"},{"value":"item4","text":"A housing problem"},{"value":"item5","text":"An employment related problem"},{"value":"item6","text":"A crime committed against you (including domestic abuse)"},{"value":"item7","text":"A pregnancy"},{"value":"item8","text":"The need to look after one or more children under the age of 1"},{"value":"item9","text":"Dependancy on alchohol"},{"value":"item10","text":"Dependancy on street drugs"},{"value":"item11","text":"Dependancy on nicotine"}]},{"type":"comment","name":"question10","title":"What are you doing to help you cope with these feelings?"},{"type":"comment","name":"question11","title":"How are these feelings affecting your life?"},{"type":"checkbox","name":"question12","title":"If these feelings did not exist, what would could you enjoy that you do not enjoy now","choices":[{"value":"item1","text":"A working life"},{"value":"item2","text":"A family life"},{"value":"item3","text":"A Social & Leisure life"},{"value":"item4","text":"A Private life"},{"value":"item5","text":"Close relationships"}]},{"type":"checkbox","name":"question13","title":"To understand who to signpost you to it would be helpful to understand if you have been diagnosed as any of the following: ","choices":[{"value":"item1","text":"Long term physical health issues"},{"value":"item2","text":"Long term mental health issues"}]},{"type":"comment","name":"question14","title":"If you have a long term condition please provide more details, including and any therapy or medication that have been prescribed for you?"},{"type":"matrix","name":"question16","title":"How often have you been bothered by the following over the past two weeks (leave blank if the answer is not at all)","columns":[{"value":"item1_1","text":"Several days"},{"value":"item2_2","text":"More that half of the days"},{"value":"item3_3","text":"Nearly every day"}],"rows":["Feeling anxious","Uncontrollable worry","Worrying about differing things","An inability to relax","An inability to sit still","Being easily annoyed/Irritated","Afraid something awful will happen"]},{"type":"checkbox","name":"question17","title":"As you may expect, we are required to understand if you are at immediate risk to yourself or others.  Please pardon the directness of these questions.  Please tick the following if they true.","choices":[{"value":"item1_1","text":"Over the past 4 weeks have things got so bad that I have had thoughts about physically hurting myself or others.  "},{"value":"item2_1","text":"I have made plans to act upon these thoughts"},{"value":"item3_1","text":"I have acted upon such plans in the past"}]}]}]},"role":"FORM1","rules":{"RED":[],"GREEN":[]},"__v":0}]

      });
  });

  it('Component fetching ReviewPage from API', async (done) => {
      const root = shallow(<ReviewPage/>);
      await waitUntil(() => root.state('userAnswers') !== null);
      expect(root.state('userAnswers').length).toEqual(1);
      done();
  });
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

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ReviewPage />, div)
  ReactDOM.unmountComponentAtNode(div)
  
})

