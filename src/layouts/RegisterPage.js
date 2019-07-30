import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/userActions';
import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'
import { registerUser } from '../services/BackendService.js'
import SelectableTable from '../components/CheckedTable/CheckedTable.js'
import history from '../history'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                postcode: '',
                telephone: '',
                password: '',
                repeatedPassword: '',
                service: null,
                postcode: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myCallback = this.myCallback.bind(this);
    }



    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;

        if (user.firstName && user.lastName && user.email && user.password && user.repeatedPassword && user.postcode && user.telephone) {
            if (user.password !== user.repeatedPassword){
                alert("Passwords don't match");
            }
            else{
                registerUser({"email":user.email, "password": user.password, "first_name": user.firstName, "last_name": user.lastName,
            "postcode": user.postcode})
                  .then(fetchedData => {
                    console.log("fetchedData")
                    console.log(fetchedData)
                    alert("Registered successfully");
                    history.push('/login');
                  })
                  .catch(error => {
                    console.error(error);
                  });
            }
        }
    }

    myCallback = (dataFromChild) => {
        console.log("selected service id");
        console.log(dataFromChild);
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                service: dataFromChild
            }
        });
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
          <div className='landing-page-container'>
            <NHSHeader />
            <div className="col-md-6 col-md-offset-3">
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName"></label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} placeholder={'First Name'}/>
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName"></label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} placeholder={'Last Name'}/>
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email"></label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} placeholder={'Email'}/>
                        {submitted && !user.email &&
                            <div className="help-block">email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.postcode ? ' has-error' : '')}>
                        <label htmlFor="postcode"></label>
                        <input type="text" className="form-control" name="postcode" value={user.postcode} onChange={this.handleChange} placeholder={'Postcode'}/>
                        {submitted && !user.postcode &&
                            <div className="help-block">postcode is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.telephone ? ' has-error' : '')}>
                        <label htmlFor="telephone"></label>
                        <input type="text" className="form-control" name="telephone" value={user.telephone} onChange={this.handleChange} placeholder={'Telephone'}/>
                        {submitted && !user.telephone &&
                            <div className="help-block">telephone is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password"></label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} placeholder={'Password'}/>
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.repeatedPassword ? ' has-error' : '')}>
                        <label htmlFor="password"></label>
                        <input type="password" className="form-control" name="repeatedPassword" value={user.repeatedPassword} onChange={this.handleChange} placeholder={'Repeat your password'}/>
                        {submitted && !user.repeatedPassword &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.postcode ? ' has-error' : '')}>
                        <label htmlFor="postcode"></label>
                        <input type="text" className="form-control" name="postcode" value={user.postcode} onChange={this.handleChange} placeholder={'Post Code'}/>
                        {submitted && !user.postcode &&
                            <div className="help-block">Post Code is required</div>
                        }
                    </div>
                    <div>
                        <SelectableTable callbackFromParent={this.myCallback}/>
                    </div>
                        
                 
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
            <NHSFooter />

          </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(null, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };

