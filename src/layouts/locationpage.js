import React from 'react';
import { getLocationgivenPostalCode } from './BackendService';
import ReactDOM from 'react-dom';
import NHSHeader from './components/NHSHeader.js'
import NHSFooter from './components/NHSFooter.js'
import ResourcesPage from '../src/resourcespage';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Switch } from 'react-router'
import './sass/app.scss';

class LocationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postcode: '',
            latitude: '',
            longitude: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({ postcode: event.target.value });
    }

    handleSubmit(event) {
        //alert('PostCode Submited ' + this.state.postcode);
        getLocationgivenPostalCode(this.state.postcode).then(loc => {
            try {
                this.state.latitude = loc.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
                this.state.longitude = loc.data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
                var id = this.state.latitude + "," + this.state.longitude;
                this.props.history.push('/resources/' + id);
            } catch (error) {
                console.log("No results Found for that postcode"); //TODO PUT ON A PAGE
            }
        });

        event.preventDefault();

    }


    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/locationpage" exact render={() => {
                        return (
                            <div class="nhsuk-expander-group">
                                <NHSHeader />
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        Please enter your postcode:
                                         <input type="text" value={this.state.value} onChange={this.handleChange} />
                                    </label>
                                    <input class="nhsuk-search__submit" type="submit" value="Submit" />
                                    
                                </form>


                                <NHSFooter />
                            </div>

                        );
                    }} />
                    {/* <Route path="/resourcesage" component={ResourcesPage} /> */}
                </Switch>
            </Router>
        );
    }

}

export default LocationPage;