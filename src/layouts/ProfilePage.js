import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/userActions';
import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'
import { getPatientProfile } from '../services/BackendService.js'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: 'ss',
                lastName: '',
                email: '',
                postcode: '',
                telephone: '',
                service: null,
            },
            submitted: false
        };

    }


    componentWillMount () {
        getPatientProfile().then(
            response => {
                // console.log("getPatientProfile")
                console.log(response)
                

                if (response){
                    var newUser = {
                    firstName: response.first_name,
                    lastName: response.last_name,
                    email: response.email,
                    postcode: response.postcode,
                    telephone: 'not provided',
                    service: response.service_id
                }
                  this.setState({ user: newUser})
                }
            }
        )
    }

    render() {
        const { user, submitted } = this.state;
        return (
          <div className='landing-page-container'>
            <NHSHeader />
            <div className="col-md-6 col-md-offset-3">
                <form name="form" >
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} />
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email </label>
                        <input type="text" className="form-control" name="email" value={user.email} />
                        {submitted && !user.email &&
                            <div className="help-block">email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.postcode ? ' has-error' : '')}>
                        <label htmlFor="postcode">Postcode</label>
                        <input type="text" className="form-control" name="postcode" value={user.postcode} />
                        {submitted && !user.postcode &&
                            <div className="help-block">postcode is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.telephone ? ' has-error' : '')}>
                        <label htmlFor="telephone">Telephone</label>
                        <input type="text" className="form-control" name="telephone" value={user.telephone} />
                        {submitted && !user.telephone &&
                            <div className="help-block">telephone is required</div>
                        }
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="service">Service</label>
                        <input type="text" className="form-control" name="service" value={user.service} />
                    </div>
                        
                    <div className="form-group">
                        <Link to="/landingpage" className="btn btn-link">Back</Link>
                        
                    </div>
                </form>
            </div>
            <NHSFooter />

          </div>
        );
    }
}

const actionCreators = {
    register: userActions.register
}

const connectedProfilePage = connect(null, actionCreators)(ProfilePage);
export { connectedProfilePage as ProfilePage };
