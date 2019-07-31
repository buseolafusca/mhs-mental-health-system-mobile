import React from 'react'
import '../assets/css/LandingPage.css'
import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'
// import { firebaseConfig } from '../variables/general'
import { fetchPublishedQuestionnaires } from '../services/BackendService.js'
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import '../assets/css/firebaseui-styling.global.css'
import {isLoggedIn } from './LoginPage'

class Square extends React.Component {
  render () {
    return (
      <a href={this.props.url} className='box' style={{ color: '#fff' }}>{this.props.title}</a>
    )
  }
}
// class SignUpInPage extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       firebase: '',
//       uiConfig: ''
//     }
//   }

//   componentWillMount () {
//     var firebase = require('firebase')
//     firebase.initializeApp(firebaseConfig)
//     const uiConfig = {
//       // Popup signin flow rather than redirect flow.
//       signInFlow: 'popup',
//       // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//       signInSuccessUrl: '/dashboard',
//       // We will display Google and Facebook as auth providers.
//       signInOptions: [
//         firebase.auth.EmailAuthProvider.PROVIDER_ID
//       ]
//     }

//     this.setState({ firebase: firebase, uiConfig: uiConfig })
//   }

//   signUpNewUser (email, password) {
//     this.state.firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
//       // Handle Errors here.
//       var errorCode = error.code
//       var errorMessage = error.message
//       // ...
//       // if user excists send message
//     })
//   }

//   signInExistingUser (email, password) {
//     this.state.firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
//       // Handle Errors here.
//       var errorCode = error.code
//       var errorMessage = error.message
//       // ...
//     })
//   }

//   render () {
//     return (
//       <div className='landing-page-container'>
//         <NHSHeader />
//         <div className='wrapper-container'>
//           {/* <div className='wrapper'> */}
//           <div >
//             <h1>Welcome to MHS</h1>
//             <p>Please enter your email:</p>
//             <StyledFirebaseAuth uiConfig={this.state.uiConfig} firebaseAuth={this.state.firebase.auth()} />
//           </div>
//           {/* </div> */}
//         </div>
//         <NHSFooter />
//       </div>
//     )
//   }
// }

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
        // console.log(response.questionnaireList)
        if (response){
          this.setState({ questionnaireList: response.questionnaireList})
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
            <Square url='/review' title='Previous Contact' />
          </div>
        </div>
        <NHSFooter />
      </div>
    )
  }
}

// export { LandingPage , SignUpInPage }
export default LandingPage
