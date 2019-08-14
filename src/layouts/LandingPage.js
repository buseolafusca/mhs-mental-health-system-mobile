import React from 'react'
import '../assets/css/LandingPage.css'
import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'
// import { firebaseConfig } from '../variables/general'
import { fetchPublishedQuestionnaires } from '../services/BackendService.js'
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import '../assets/css/firebaseui-styling.global.css'

class Square extends React.Component {
  render () {
    return (
      <a href={this.props.url} className='box' style={{ color: '#fff' }}>{this.props.title}</a>
    )
  }
}


class LandingPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      questionnaireList: [],
      user: null
    }
  }

  componentWillMount () {
    fetchPublishedQuestionnaires().then(
      response => {
        console.log("response.questionnaireList")
        console.log(response)
        if (response){
          this.setState({ questionnaireList: response})
        }
      }
    )
  }

  render () {
    return (
      <div className='landing-page-container'>
        <NHSHeader />
        <div className='wrapper-container'>
          <div className='wrapper'>
            {this.state.questionnaireList.map((item, key) =>
              <Square url={'/questionnaire/' + item._id} title={item.title} key={key} />
            )}
            <Square url='/referrals' title='Referrals' />
            <Square url='/appointments' title='Appointments' />
            <Square url='/locationpage' title='Resources' />
            <Square url='/profile' title='Profile' />
            <Square url='/logout' title='Log Out' />
            <Square url='/review' title='Previous Contact' />
          </div>
        </div>
        <NHSFooter />
      </div>
    )
  }
}

export default LandingPage
