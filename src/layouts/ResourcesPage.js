import React from 'react'
import { getCategoriesBasedOnLocation, getListBasedOnCategoryAndLocation, getPlaceDetails } from '../services/BackendService'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import '../sass/app.scss'
import '../assets/css/ResourcesPage.css'

import { Switch } from 'react-router'
import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'

class ResourcesPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      categoriesList: [],
      categoryListID: [],
      coordinates: []
    }
    this.handleClickofCategory = this.handleClickofCategory.bind(this)
    this.handleGoBackButton = this.handleGoBackButton.bind(this)
  }

  componentWillMount () {
    const { id } = this.props.match.params
    this.setState({ coordinates: id })
    var array = []
    var catID = {}
    getCategoriesBasedOnLocation(id).then(response => {
      response.data.items.forEach(element => {
        var category = element.within[0]
        if (category != null) {
          var splitedCategory = category.split('-')
          var finalCategory = ''
          splitedCategory.forEach(cat => {
            finalCategory += cat.charAt(0).toUpperCase() + cat.slice(1) + ' '
          })
          if (!array.includes(finalCategory, 0)) {
            catID[finalCategory] = category
            array.push(finalCategory)
          }
        }
      })
      this.setState({ categoriesList: array, categoryListID: catID })
    })
  }

  handleClickofCategory (item) {
    this.props.history.push('/resources/' + this.state.coordinates + '/' + this.state.categoryListID[item])
  }

  handleGoBackButton (pg) {
    this.props.history.push('/locationpage')
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path='/resources/:id' exact render={() => {
            return (
              <div class='nhsuk-expander-group'>
                <NHSHeader />
                <div class='nhsuk-back-link resourcepage-back-link'>
                  <a class='nhsuk-back-link__link resourcepage-back-link__link' onClick={() => { this.handleGoBackButton('/locationpage') }}>
                    <svg class='nhsuk-icon nhsuk-icon__chevron-left recourcepage-icon__Chevron-left' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'>
                      <path d='M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z' />
                    </svg>
                                        Go back</a>
                </div>
                {this.state.categoriesList.map((item, key) =>
                  <details class='nhsuk-details expander' >
                    <summary class='nhsuk-details__summary' onClick={() => { this.handleClickofCategory(item) }}>
                      <span class='nhsuk-details__summary'>
                        {item}
                      </span>
                    </summary>
                  </details>
                )}

              </div>
            )
          }} />
        </Switch>
      </Router>
    )
  }
}

class PlacesPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      placesList: [],
      coordinates: [],
      category: ''
    }
    this.handleGoBackButton = this.handleGoBackButton.bind(this)
    this.handleClickOfPlace = this.handleClickOfPlace.bind(this)
  }

  componentWillMount () {
    const { id } = this.props.match.params
    const { cat } = this.props.match.params
    console.log('*********')
    console.log(cat)
    this.setState({ coordinates: id })
    this.setState({ category: cat })
    console.log(this.state.coordinates)
    try {
      getListBasedOnCategoryAndLocation(id, cat, 1000).then(response => {
        var placesArray = []
        response.data.results.items.forEach(place => {
          placesArray.push(place)
        })
        this.setState({ placesList: placesArray })
        if (this.state.placesList.length === 0) {
          var place = {}
          place.id = '-1'
          place.title = 'No places found'
          place = [place]
          this.setState({ placesList: place })
        }
      })
    } catch (error) {
      console.log('Error in GET categories')
    }
  }

  handleGoBackButton (pg) {
    this.setState({ placesList: [] })
    console.log(this.state.placesList)
    this.props.history.push('/resources/' + this.state.coordinates)
  }

  handleClickOfPlace (place) {
    // console.log(place);
    if (place.id !== '-1') {
      // this.props.history.push('/resources/' + this.state.coordinates + '/' + this.state.category + '/' + JSON.stringify(place));
      this.props.history.push({
        pathname: '/resources/' + this.state.coordinates + '/' + this.state.category + '/' + place.title,
        state: { detail: place }
      })
    }
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path='/resources/:id/:cat' render={() => {
            return (
              <div class='nhsuk-expander-group'>
                <NHSHeader />
                <div class='nhsuk-back-link resourcepage-back-link'>
                  <a class='nhsuk-back-link__link resourcepage-back-link__link' onClick={() => { this.handleGoBackButton('/resources/' + this.state.coordinates) }}>
                    <svg class='nhsuk-icon nhsuk-icon__chevron-left recourcepage-icon__Chevron-left' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'>
                      <path d='M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z' />
                    </svg>
                                        Go back</a>
                </div>
                {this.state.placesList.map((item, key) =>
                  <details class='nhsuk-details expander' >
                    <summary class='nhsuk-details__summary' onClick={() => { this.handleClickOfPlace(item) }}>
                      <span class='nhsuk-details__summary'>
                        {item.title}
                      </span>
                    </summary>
                  </details>
                )}

                {/* <NHSFooter /> Footer causes problems TODO Fix */}
              </div>
            )
          }} />
        </Switch>

      </Router>
    )
  }
}

class SinglePlacePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      coordinates: [],
      category: '',
      place: props.location.state.detail,
      placeDetails: {},
      placeLocation: {}
    }
    if (this.state.place === '') {
      this.state.place = { title: 'MAPS API ERROR' }
    }
    this.handleGoBackButton = this.handleGoBackButton.bind(this)
  }

  componentWillMount () {
    const { id } = this.props.match.params
    const { cat } = this.props.match.params
    // const { place } = this.props.match.params
    this.setState({ coordinates: id }) //! !!!!
    this.setState({ category: cat }) //! !!!!
    getPlaceDetails(this.state.place.href).then(response => {
      this.setState({ placeDetails: response.data })
      this.state.placeDetails = response.data
      console.log(this.state.placeDetails.location.address)
      this.setState({ placeLocation: this.state.placeDetails.location.address })
      // this.render();
    })
  }

  handleGoBackButton (pg) {
    this.setState({ placesList: [] })
    console.log(this.state)
    this.props.history.push('/resources/' + this.state.coordinates + '/' + this.state.category)
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path='/resources/:id/:cat' render={() => {
            return (
              <div class='nhsuk-expander-group'>
                <NHSHeader />
                <div class='nhsuk-back-link resourcepage-back-link'>
                  <a class='nhsuk-back-link__link resourcepage-back-link__link' onClick={() => { this.handleGoBackButton('/resources/' + this.state.coordinates) }}>
                    <svg class='nhsuk-icon nhsuk-icon__chevron-left recourcepage-icon__Chevron-left' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden='true'>
                      <path d='M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z' />
                    </svg>
                                        Go back</a>
                </div>
                <div class='place'>
                  <a class='place-title' href={this.state.placeDetails.view}>{this.state.placeDetails.name}</a>
                  <br />
                  <a class='place-address'>{this.state.placeLocation.house} {this.state.placeLocation.street}</a>
                  <br />
                  <a class='place-address'>{this.state.placeLocation.district}</a>
                  <br />
                  <a class='place-address'>{this.state.placeLocation.city}</a>
                  <br />
                </div>

                <NHSFooter />
              </div>
            )
          }} />
        </Switch>

      </Router>
    )
  }
}

export { ResourcesPage, PlacesPage, SinglePlacePage }