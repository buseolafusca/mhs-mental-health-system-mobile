import React from 'react'
import { getCategoriesBasedOnLocation, getListBasedOnCategoryAndLocation, getPlaceDetails } from '../services/BackendService'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import '../sass/app.scss'
import '../assets/css/ResourcesPage.css'
import { Switch } from 'react-router'
import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'
import 'here-js-api/scripts/mapsjs-core'
import 'here-js-api/scripts/mapsjs-service'
import 'here-js-api/scripts/mapsjs-ui'
import 'here-js-api/scripts/mapsjs-mapevents'
import 'here-js-api/scripts/mapsjs-clustering'
import 'here-js-api/scripts/mapsjs-places'
import { appId as apI, appCode as apC } from '../variables/URLs'

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
    console.log("ResourcesPage")
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
    // console.log("props")
    // console.log(props)
    // console.log(JSON.stringify(props))
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
    console.log("PlacesPage")
    const { id } = this.props.match.params
    const { cat } = this.props.match.params
    this.setState({ coordinates: id })
    this.setState({ category: cat })
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
    this.props.history.push('/resources/' + this.state.coordinates)
  }

  handleClickOfPlace (place) {
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
    console.log("33333")
    // console.log(JSON.stringify(props))
    super(props)
    console.log(props)
    console.log(props.location)
    this.state = {
      coordinates: [],
      category: '',
      place: props.location.state.detail,
      placeDetails: {},
      placeLocation: {},
      placeCoordinates: {},
      appID: apI,
      appCode: apC
    }
    if (this.state.place === '') {
      this.state.place = { title: 'MAPS API ERROR' }
    }
    this.handleGoBackButton = this.handleGoBackButton.bind(this)
    this.handleGoBackButton = this.handleGoBackButton.bind(this)
    this.interactiveMap = this.interactiveMap.bind(this)
  }

  componentWillMount () {
    console.log("SinglePlacePage")
    const { id } = this.props.match.params
    const { cat } = this.props.match.params
    // const { place } = this.props.match.params
    this.setState({ coordinates: id }) //! !!!!
    this.setState({ category: cat }) //! !!!!
    getPlaceDetails(this.state.place.href).then(response => {
      this.setState({ placeDetails: response.data })
      this.state.placeDetails = response.data
      this.setState({ placeLocation: this.state.placeDetails.location.address })
      this.setState({ placeCoordinates: this.state.placeDetails.location.position })
      // this.render();
      this.interactiveMap()
    })
  }

  handleGoBackButton (pg) {
    this.setState({ placesList: [] })
    this.props.history.push('/resources/' + this.state.coordinates + '/' + this.state.category)
  }

  interactiveMap () {
    var coordinates = {
      lat: this.state.placeCoordinates[0],
      lng: this.state.placeCoordinates[1]
    }
    var H = window.H

    /**
 * Boilerplate map initialization code starts below:
 */
    // Step 1: initialize communication with the platform
    // In your own code, replace window.app_id with your own app_id
    // and window.app_code with your own app_code
    var platform = new H.service.Platform({
      app_id: this.state.appID,
      app_code: this.state.appCode,
      useCIT: true,
      useHTTPS: true
    })

    // Step 2: initialize a map - this map is centered over Europe
    var d = document.createElement('div')
    d.id = 'map'
    document.getElementById('mapcontainer').appendChild(d)
    var defaultLayers = platform.createDefaultLayers()
    var map = new H.Map(document.getElementById('map'),
      defaultLayers.normal.map, {
        center: { lat: 50, lng: 5 },
        zoom: 4
      })
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize())

    // Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers)

    var placemarker = new H.map.Marker(coordinates)
    map.addObject(placemarker)
    // Now use the map as required...
    map.setCenter(coordinates)
    map.setZoom(14)
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

                <div id='placeList' class='place'>
                  <a class='place-title' href={this.state.placeDetails.view}>{this.state.placeDetails.name}</a>
                  <br />
                  <a class='place-address'>{this.state.placeLocation.house} {this.state.placeLocation.street}</a>
                  <br />
                  <a class='place-address'>{this.state.placeLocation.district}</a>
                  <br />
                  <a class='place-address'>{this.state.placeLocation.city}</a>
                  <br />
                  <div id='mapcontainer' />

                </div>
                {/* <Helmet></Helmet> */}
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
