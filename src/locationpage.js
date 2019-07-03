import React from 'react';
import { getLocationgivenPostalCode } from './BackendService';
import ReactDOM from 'react-dom';
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
            this.state.latitude = loc.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
            this.state.longitude = loc.data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
            console.log(JSON.stringify(this.state));
        });

        event.preventDefault();
        this.props.history.push('/resources');
    }


    render() {
        return (
            <div class="nhsuk-expander-group">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Please enter your PostalCode:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>



            </div>
        );
    }

}

export default LocationPage;