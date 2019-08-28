import React from 'react'
import { getLocationGivenPostalCode } from '../services/BackendService'
import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router'
import '../sass/app.scss'
import '../assets/css/ResourcesPage.css'
import "../assets/css/LocationPage.css";


class LocationPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      postcode: '',
      latitude: '',
      longitude: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ postcode: event.target.value })
  }

  handleSubmit (event) {
    getLocationGivenPostalCode(this.state.postcode).then(loc => {
      try {
        //this.state.latitude = loc.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude
        this.setState({latitude:loc.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude})
        //this.state.longitude = loc.data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude
        this.setState({longitude: loc.data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude})
        var id = this.state.latitude + ',' + this.state.longitude
        this.props.history.push('/resources/' + id)
      } catch (error) {
      }
    })

    event.preventDefault()
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path='/locationpage' exact render={() => {
            return (
              <div class='nhsuk-expander-group'>
                <NHSHeader />
                <label>
                      Please enter your postcode:
                </label>
                <form className="SurveyResult1" onSubmit={this.handleSubmit}>

                  <br /><span>
                    <input type='text' class='postcode' value={this.state.value} onChange={this.handleChange} />
                    <br />
                    <input class='nhsuk-search__submit submit' type='submit' value='Submit' />
                  </span>
                </form>
                <NHSFooter />
              </div>
            )
          }} />
        </Switch>
      </Router>
    )
  }
}

export default LocationPage
