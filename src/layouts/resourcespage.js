import React from 'react';
import { getCategoriesBasedOnLocation, getListBasedOnCategoryAndLocation,getPlaceDetails } from '../services/BackendService'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import '../sass/app.scss';
import '../assets/css/Resourcespage.css';

import { Switch } from 'react-router';
import NHSHeader from '../components/NHSHeader.js';
import NHSFooter from '../components/NHSFooter.js';


class ResourcesPage extends React.Component { //One component per page /// postcode-->categories-->places-->place

    constructor(props) {
        super(props);
        this.state = {
            categoriesList: [],
            categoryListID: [],
            coordinates: []
        }
        this.handleClickofCategory = this.handleClickofCategory.bind(this);
        this.handleGoBackButton = this.handleGoBackButton.bind(this);
        // this.handleClickOfPlace = this.handleClickOfPlace.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.match.params;
        // const { cat } = this.props.match.params;
        // console.log("cat= " + JSON.stringify(this.props.match));
        // console.log(cat);
        this.setState({ coordinates: id });
        // console.log(this.state.coordinates);
        var array = [];
        var catID = {};
        getCategoriesBasedOnLocation(id).then(response => {
            response.data.items.forEach(element => {
                //try {
                var category = element.within[0];
                if (category != null) {
                    var splitedCategory = category.split("-");
                    var finalCategory = "";
                    splitedCategory.forEach(cat => {
                        finalCategory += cat.charAt(0).toUpperCase() + cat.slice(1) + " ";
                    });
                    if (!array.includes(finalCategory, 0)) {
                        catID[finalCategory] = category;
                        array.push(finalCategory);
                    }
                }
                //  } catch (error) {
                //     console.log("Error while parsing Categories");
                // }
            });
            //this.setState({ categoriesList: response.questionnaireList });
            this.setState({ categoriesList: array, categoryListID: catID });
        });
    }


    handleClickofCategory(item) {
        console.log(item)
        this.props.history.push('/resources/' + this.state.coordinates + '/' + this.state.categoryListID[item]);
        //this.props.history.push('/resources/'+this.state.coordinates);
    }


    handleGoBackButton(pg) {
        console.log(pg);
        this.props.history.push('/locationpage');

    }





    render() {

        return (
            <Router>
                <Switch>
                    <Route path="/resources/:id" exact render={() => {
                        return (
                            <div class="nhsuk-expander-group">
                                <NHSHeader />
                                <div class="nhsuk-back-link resourcepage-back-link">
                                    <a class="nhsuk-back-link__link resourcepage-back-link__link" onClick={() => { this.handleGoBackButton("/locationpage") }}>
                                        <svg class="nhsuk-icon nhsuk-icon__chevron-left recourcepage-icon__Chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
                                        </svg>
                                        Go back</a>
                                </div>
                                {this.state.categoriesList.map((item, key) =>
                                    <details class="nhsuk-details expander" >
                                        <summary class="nhsuk-details__summary" onClick={() => { this.handleClickofCategory(item) }}>
                                            <span class="nhsuk-details__summary">
                                                {item}
                                            </span>
                                        </summary>
                                    </details>
                                )}


                                {/* <NHSFooter /> Footer causes problems TODO Fix */}
                            </div>
                        );
                    }} />
                    {/* <Route path="/resources/:id/:cat" render={() => {

                        return (
                            <div class="nhsuk-expander-group">
                                <NHSHeader />
                                <div class="nhsuk-back-link resourcepage-back-link">
                                    <a class="nhsuk-back-link__link resourcepage-back-link__link" onClick={() => { this.handleGoBackButton("/resources/" + this.state.coordinates) }}>
                                        <svg class="nhsuk-icon nhsuk-icon__chevron-left recourcepage-icon__Chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
                                        </svg>
                                        Go back</a>
                                </div>
                                {this.state.categoriesList.map((item, key) =>
                                    <details class="nhsuk-details expander" >
                                        <summary class="nhsuk-details__summary" onClick={() => { this.handleClickOfPlace(item) }}>
                                            <span class="nhsuk-details__summary">
                                                {item}
                                            </span>
                                        </summary>
                                    </details>
                                )}
                            </div>
                        );
                    }} /> */}


                    {/* <Route path="/resources/:id/:cat/:place" exact render={() => {

                        return (
                            <div class="nhsuk-expander-group">
                                <NHSHeader />
                                <div class="nhsuk-back-link resourcepage-back-link">
                                    <a class="nhsuk-back-link__link resourcepage-back-link__link" onClick={() => { this.handleGoBackButton("/resources/" + this.state.coordinates) }}>
                                        <svg class="nhsuk-icon nhsuk-icon__chevron-left recourcepage-icon__Chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
                                        </svg>
                                        Go back</a>
                                </div>
                            
                            </div>
                        );
                    }} /> */}
                </Switch>
            </Router>
        );
    }

}


class PlacesPage extends React.Component { //One component per page /// postcode-->categories-->places-->place

    constructor(props) {
        super(props);
        this.state = {
            placesList: [],
            coordinates: [],
            category: ""
        }
        this.handleGoBackButton = this.handleGoBackButton.bind(this);
        this.handleClickOfPlace = this.handleClickOfPlace.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.match.params;
        const { cat } = this.props.match.params;
        console.log("*********");
        console.log(cat);
        this.setState({ coordinates: id });
        this.setState({ category: cat });
        console.log(this.state.coordinates);
        try {
            getListBasedOnCategoryAndLocation(id, cat, 1000).then(response => {
                var placesArray = [];
                response.data.results.items.forEach(place => {
                    placesArray.push(place);
                });
                this.setState({ placesList: placesArray });
                if (this.state.placesList.length == 0) {
                    var place = {};
                    place.id = "-1"
                    place.title = "No places found"
                    var place = [place];
                    this.setState({ placesList: place });
                }


            });
        } catch (error) {
            console.log("Error in GET categories");
        }




    }



    handleGoBackButton(pg) {
        this.setState({ placesList: [] });
        console.log(this.state.placesList);
        this.props.history.push('/resources/' + this.state.coordinates);

    }

    handleClickOfPlace(place) {
        console.log(place);
        if (place.id != "-1") {
           // this.props.history.push('/resources/' + this.state.coordinates + '/' + this.state.category + '/' + JSON.stringify(place));
           this.props.history.push({
            pathname: '/resources/' + this.state.coordinates + '/' + this.state.category + '/' + place.title,
            state: { detail: place }
          })
        }
    }




    render() {

        return (
            <Router>
                <Switch>
                    <Route path="/resources/:id/:cat" render={() => {

                        return (
                            <div class="nhsuk-expander-group">
                                <NHSHeader />
                                <div class="nhsuk-back-link resourcepage-back-link">
                                    <a class="nhsuk-back-link__link resourcepage-back-link__link" onClick={() => { this.handleGoBackButton("/resources/" + this.state.coordinates) }}>
                                        <svg class="nhsuk-icon nhsuk-icon__chevron-left recourcepage-icon__Chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
                                        </svg>
                                        Go back</a>
                                </div>
                                {this.state.placesList.map((item, key) =>
                                    <details class="nhsuk-details expander" >
                                        <summary class="nhsuk-details__summary" onClick={() => { this.handleClickOfPlace(item) }}>
                                            <span class="nhsuk-details__summary">
                                                {item.title}
                                            </span>
                                        </summary>
                                    </details>
                                )}


                                {/* <NHSFooter /> Footer causes problems TODO Fix */}
                            </div>
                        );
                    }} />
                </Switch>

            </Router>
        )
    }

}

class SinglePlacePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [],
            category: "",
            place: props.location.state.detail,
            placeDetails:{}
        }
        if(this.state.place==""){
            this.state.place={title:"MAPS API ERROR"};
        }
        this.handleGoBackButton = this.handleGoBackButton.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.match.params;
        const { cat } = this.props.match.params;
        const { place } = this.props.match.params;
        this.setState({ coordinates: id }); //!!!!!
        this.setState({ category: cat }); //!!!!!
       getPlaceDetails(this.state.place.href).then(response=>{
        this.setState({placeDetails:response.data})
        console.log(response.data);
       });
      // console.log(this.state.place);
       // this.state.place=JSON.parse();
       // console.log(JSON.parse(this.state.place).title);
    }

    handleGoBackButton(pg) {
        this.setState({ placesList: [] });
        console.log(this.state);
        this.props.history.push('/resources/' + this.state.coordinates+"/"+this.state.category);
    }

    render() {

        return (
            <Router>
                <Switch>
                    <Route path="/resources/:id/:cat" render={() => {

                        return (
                            <div class="nhsuk-expander-group">
                                <NHSHeader />
                                <div class="nhsuk-back-link resourcepage-back-link">
                                    <a class="nhsuk-back-link__link resourcepage-back-link__link" onClick={() => { this.handleGoBackButton("/resources/" + this.state.coordinates) }}>
                                        <svg class="nhsuk-icon nhsuk-icon__chevron-left recourcepage-icon__Chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
                                        </svg>
                                        Go back</a>
                                </div>
                                <div class="place">
                                <a class="place-title" href={this.state.placeDetails.view}>{this.state.placeDetails.name}</a>
                                
                                </div>


                                <NHSFooter/>
                            </div>
                        );
                    }} />
                </Switch>

            </Router>
        )
    }

}

export { ResourcesPage, PlacesPage, SinglePlacePage };