import React from 'react';
import { getCategoriesBasedOnLocation, getListBasedOnCategoryAndLocation } from './BackendService'
import ReactDOM from 'react-dom';
import './sass/app.scss';
import './Resourcespage.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import NHSHeader from './components/NHSHeader.js';
import NHSFooter from './components/NHSFooter.js';


class ResourcesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoriesList: [],
            categoryListID: [],
            coordinates: []
        }
        this.handleClickofCategory = this.handleClickofCategory.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.match.params;
        const { cat } = this.props.match.params;
        if (cat == null) {
            console.log("Coordinates " + id);
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
        }else{
            
        }


    }


    handleClickofCategory(item) {
        console.log(this.state.categoryListID[item]);
        console.log(this.state.coordinates);
        getListBasedOnCategoryAndLocation(this.state.coordinates, this.state.categoryListID[item], 1000).then(response => {
            var placesArray = [];
            response.data.results.items.forEach(place => {
                placesArray.push(place.title);
            });
            this.setState({ categoriesList: placesArray });

        });
    }

    render() {

        return (
            <Router>
                <Switch>
                    <Route path="/resources/:id" render={() => {

                        return (
                            <div class="nhsuk-expander-group">
                                <NHSHeader />
                                <div class="nhsuk-back-link resourcepage-back-link">
                                    <a class="nhsuk-back-link__link resourcepage-back-link__link" href="#">
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
                    <Route path="/resources/:id/cat" render={() => {

                        return (
                            <div class="nhsuk-expander-group">
                                <NHSHeader />
                                <div class="nhsuk-back-link resourcepage-back-link">
                                    <a class="nhsuk-back-link__link resourcepage-back-link__link" href="#">
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
                </Switch>
            </Router>
        );
    }

}

export default ResourcesPage;