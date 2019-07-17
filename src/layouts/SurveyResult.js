import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "bootstrap/dist/css/bootstrap.css";
import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import "jquery-bar-rating/dist/themes/css-stars.css";
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";
import * as widgets from "surveyjs-widgets";
import "icheck/skins/square/blue.css";
import axios from "axios";
import { getAnsweredQuestionnaire, getQuestionnaire, getAuthenticationToken, getQuestionnaireWithoutToken, getQuestionnaireWithToken } from "../services/BackendService";

import { backendUrl, createUserAnswers } from "../variables/general";


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
      <a href={this.props.url} className='box' style={{ color: '#fff' }}>&nbsp;&nbsp;&nbsp;&nbsp;Work on your next survey&nbsp;&nbsp;&nbsp;&nbsp;</a>
    )
  }
}

class SurveyResult extends Component {

  constructor(props) {
    super(props);
    this.state = { json: 
      {
        "title": "",
        "description": "",
        "completedHtml": "",
        "pages": [],
        "showProgressBar": ""
      },
      answers : {}
    };
  }

  onValueChanged = (result) => {
    console.log("value changed!");
  }

  onComplete = (result) => {
    var finalScore = 0;
    var tableData;
    var i = 1;

    console.log(result);
    console.log(result.valuesHash);
    console.log(result.valuesHash.Question1);
    var answer=[];
    tableData = "<tr><th scope='col'> Question </th><th scope='col'> Answer </th></tr>" 


    Object.keys(result.valuesHash).map(function (key) {
 
      tableData+="<tr>"
      tableData += "<td > Question " + i + "</td>"
      finalScore = finalScore + parseInt(result.valuesHash[key], 10);

      tableData+="<td >"+ result.valuesHash[key]+"</td>";
      console.log(finalScore);
      tableData+="</tr>"
      
      answer.push({
        questionnode_id: "5d0cbbe6fc101609e9765de3", //must get this as well
        title: "Question" + i, //must get this
        value: result.valuesHash[key]
      });
      i++;

    })
    this.postAnswers(answer,"5d0ce7a7fc101609e9765de3", this.state.json.title);
    $("#tbody1").html(tableData);
    document.querySelector('#finalScore').textContent = "Final score is " + finalScore;
    
    document.querySelector('#jsonSection').textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);

  };


  /**
   * Function that posts answers to server. Needs to be intergrated in Backend Service
   * @param {*} ans list of answers
   * @param {*} questionnaire_id the questionnaire ID
   * @param {*} title of the questionnaire
   */
  postAnswers(ans,questionnaire_id,title){
    axios({
      method: 'post',
      url: backendUrl + createUserAnswers,
      data: { 
        "questionnaire_id": questionnaire_id,
        "title": title,
        "answer": ans 
      }
    });
  }

  componentWillMount() {
    const qustionId = "5d1b655ad01e83503e3a6e55";
    const answerId = "5d249a42a2a1c700307a85b0";

    // const qustionId = "5d1a1d16d910160030d04979";
    // const answerId = "5d235426fc81ba2827c5a399";

// 0 {_id: "5d249893a2a1c700307a85af", questionnaire_id: "5d1c97c473589a0030d798b3", title: "Test 3", patient_name: "Justin", patiend_id: "5d135b30865a25190df56838", …}
// 1 {_id: "5d249a42a2a1c700307a85b0", questionnaire_id: "5d1b655ad01e83503e3a6e55", title: "Triage To Treat", patient_name: "Justin", patient_id: "5d135b30865a25190df56838", …}
    
    getAnsweredQuestionnaire(answerId)
        .then(fetched_answers => {
          this.setState( {answers: JSON.parse(fetched_answers) } );

         getQuestionnaire(qustionId)
            .then(fetched_data => {
              var jsonData = fetched_data.body;
              var jsonFormatData = JSON.parse(jsonData);

              for (var i=1; i<jsonFormatData.pages.length; i++){
                if (jsonFormatData.pages[i].elements){
                  jsonFormatData.pages[0].elements = jsonFormatData.pages[0].elements.concat(jsonFormatData.pages[i].elements)
                }
              }
              jsonFormatData.pages = [jsonFormatData.pages[0]]
              jsonFormatData.pages[0].title = ""
              jsonData = JSON.stringify(jsonFormatData);
              this.setState( {json: jsonData} );
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error(error);
        });
  }

  render() {
    Survey.Survey.cssType = "bootstrap";
    this.model = new Survey.Model(this.state.json);
    this.model.data = this.state.answers;
    //set as read only
    this.model.mode="display";

    return (
      <div className="SurveyResult">
        <div className="surveyjs" >
          <Survey.Survey
            model={this.model}
          />
          
          <center>
            <table border = "1" width = "180" >
              <tbody id="tbody1">
             
              </tbody>
            </table>
          </center>
          <div id="finalScore"></div>
          <div id="jsonSection"></div>
          <div> <Square url='/referrals' title='Referrals' /> </div>
        </div>
        
      </div>
    );
  }
}

export default SurveyResult;

