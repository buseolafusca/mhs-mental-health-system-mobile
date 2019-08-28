import React, { Component } from "react";
import * as Survey from "survey-react";

//import css style
import "survey-react/survey.css";
import "bootstrap/dist/css/bootstrap.css";
import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import "jquery-bar-rating/dist/themes/css-stars.css";
import "icheck/skins/square/blue.css";
import "../assets/css/SurveyResult.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";
import * as widgets from "surveyjs-widgets";
import { getAnsweredQuestionnaire} from "../services/BackendService";

import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'

window["$"] = window["jQuery"] = $;
require("icheck");

Survey.StylesManager.applyTheme("darkblue");

widgets.icheck(Survey, $);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

class Square extends React.Component {
  render () {
    return (
      <a href={this.props.url} className='box1' style={{ color: '#fff' }}>&nbsp;&nbsp;&nbsp;&nbsp;Next survey&nbsp;&nbsp;&nbsp;&nbsp;</a>
    )
  }
}
class SurveyResult extends Component {

  constructor(props) {
    super(props);
    this.state = { json: 
      {
        "title": "",
        "pages": [],
        "description": ""
      },
      answers : {}
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    const answerId = id;
 
    getAnsweredQuestionnaire(answerId)
        .then(fetched_answers => {

          this.setState( {answers: fetched_answers.body } );
          var jsonData = fetched_answers.questionnaireBody;
          for (var i=1; i<jsonData.pages.length; i++){
            if (jsonData.pages[i].elements){
              jsonData.pages[0].elements = jsonData.pages[0].elements.concat(jsonData.pages[i].elements)
            }
          }
          jsonData.description = ''
          this.setState( {json: jsonData} );
        })
        .catch(error => {
        });
  }


  render() {
    Survey.Survey.cssType = "bootstrap";
    this.model = new Survey.Model(this.state.json);
    this.model.data = this.state.answers;
    //set as read only
    this.model.mode="display";

    return (
      <div id = "page-container">
        <NHSHeader/>
        <div className="SurveyResult">
          <div className="surveyjs" >
            <Survey.Survey
              model={this.model}
            />
            <div> <Square url='/landingpage' title='Back' /> </div>
          </div>
        </div>
        <NHSFooter/>
      </div>
    );
  }
}

export default SurveyResult;

