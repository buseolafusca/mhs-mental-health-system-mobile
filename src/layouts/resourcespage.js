import React from 'react';
import { getCategoriesBasedOnLocation,getListBasedOnCategoryAndLocation } from './BackendService'
import ReactDOM from 'react-dom';
import './sass/app.scss';
import NHSHeader from './components/NHSHeader.js'
import NHSFooter from './components/NHSFooter.js'

class ResourcesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoriesList: []
        }

    }

    componentWillMount() {
        const { id } = this.props.match.params;
        console.log("Coordinates " + id);
        //this.setState({coordinates: id});
        // console.log(this.state.coordinates);
        var array = []
        getCategoriesBasedOnLocation(id).then(response => {
            response.data.items.forEach(element => {
                try{
                var category = element.within[0];
                if (category != null) {
                    var splitedCategory = category.split("-");
                    var finalCategory = "";
                    splitedCategory.forEach(cat => {
                        finalCategory += cat.charAt(0).toUpperCase() + cat.slice(1) + " ";
                    });
                    if (!array.includes(finalCategory, 0)) {
                        array.push(finalCategory); //TODO put everything into an appropriate array
                    }
                }
            }catch(error){
                console.log("Error while parsing Categories");
            }
            });
            //this.setState({ categoriesList: response.questionnaireList });
            this.setState({ categoriesList: array });


        });


    }

    /*
    {this.state.questionnaireList.map((item, key) =>
                            <Square url={"/questionnaire/" + item._id} title={item.title} key={key}/>
                        )}
    */

    render() {

        return (//TODO this
            <div class="nhsuk-expander-group">
                <NHSHeader />
                {this.state.categoriesList.map((item, key) =>
                    <details class="nhsuk-details nhsuk-expander">
                        <summary class="nhsuk-details__summary">
                            <span class="nhsuk-details__summary-text">
                                {item}
                            </span>
                        </summary>
                    </details>)}
                    

                    {/* <NHSFooter /> Footer causes problems TODO Fix */}
            </div>
        );
    }

}

export default ResourcesPage;