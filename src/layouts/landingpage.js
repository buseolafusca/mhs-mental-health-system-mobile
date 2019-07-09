import React from 'react'
import '../assets/css/LandingPage.css'
import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'
import { fetchPublishedQuestionnaires } from '../services/BackendService.js'

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
      questionnaireList: []
    }
  }

  componentWillMount () {
    fetchPublishedQuestionnaires().then(
      response => {
        this.setState({ questionnaireList: response.questionnaireList })
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
          </div>
        </div>
        <NHSFooter />
      </div>
    )
  }
}

export default LandingPage
