import React from 'react';
import { getCategoriesBasedOnLocation } from './BackendService'
import ReactDOM from 'react-dom';
import './sass/app.scss';

class ResourcesPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            categoriesList:[]
        }
        
    }

    componentWillMount() {
        const { id } = this.props.match.params;
        console.log("Coordinates "+id);
        //this.setState({coordinates: id});
       // console.log(this.state.coordinates);
        var array=[]
        getCategoriesBasedOnLocation(id).then(response => {
            alert(JSON.stringify(response.data.items));
            response.data.items.forEach(element => {
                if(!array.includes(element,0)){
                    array.push(element);
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
        
        return (
            <div class="nhsuk-expander-group">
                {this.state.categoriesList.map((item,key)=>
                <details class="nhsuk-details nhsuk-expander">
                    <summary class="nhsuk-details__summary">
                    <span class="nhsuk-details__summary-text">
                        {item.within[0]}
                    </span>
                    </summary>
                </details>)}
                
                

</div>
        );
    }

}

export default ResourcesPage;