import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import SurveyCreator from "./SurveyCreator";
import logo from "./logo.svg";
import "./NewSurvey.css";
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
import {getQuestionnaire,postAnswers} from './BackendService';
import sendResults from './BackendService';
import "icheck/skins/square/blue.css";
import axios from "axios";

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

class NewSurvey extends Component {

  constructor(props) {
    super(props);
    this.state = {
      json:
      {
        "title": "",
        "description": "",
        "completedHtml": "",
        "pages": [],
        "showProgressBar": ""
      }
    };
  }

  sendResult() {
    console.log("value changed!");
  }

  onValueChanged = (result) => {
    console.log("value changed!");
  }

  sendResultOnPageNext() {
    console.log("sendResultOnPageNext");
  }

  goNextPageAutomatic() {
    console.log("goNextPageAutomatic");
  }

  onComplete = (result) => {
    var finalScore = 0;
    var tableData;
    var i = 1;

    console.log(result);
    console.log(result.valuesHash);
    console.log(result.valuesHash.Question1);
    tableData = "<tr><th scope='col'>" + "Question" + "</th><th scope='col'>" + " Answer" + "</th></tr>"


    Object.keys(result.valuesHash).map(function (key) {

      tableData += "<tr>"
      tableData += "<td >" + "Question " + i + "</td>"
      finalScore = finalScore + parseInt(result.valuesHash[key], 10);

      tableData += "<td >" + result.valuesHash[key] + "</td>";
      console.log(finalScore);
      tableData += "</tr>"
      i++;

    })
    postAnswers(this.model.data, "5d0ce7a7fc101609e9765de3", this.state.json.title);
    $("#tbody1").html(tableData);
    document.querySelector('#finalScore').textContent = "Final score is " + finalScore;
    document.querySelector('#jsonSection').textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
  };


  

  

  componentWillMount() {
    console.log("componentWillMount logs");
    //const id = "5d0ce7a7fc101609e9765de61";

    const testUrl = "http://mhsbackend.azurewebsites.net/api/v1/questionnaire_sJS/5d1a1d16d910160030d04979";

    getQuestionnaire(testUrl)
      .then(fetched_data => {
        this.setState({ json: fetched_data.body });
        //var new_json = this.state.json;
        //console.log(new_json);
        //console.log(new_json.pages);

        // for (var i = 0; i < fetched_data.length; i++) { 
        //   // var questions = []
        //   var new_question = {};
        //   new_question["type"] = "radiogroup"
        //   new_question["name"] = "Question" + (i + 1)
        //   new_question["title"] = fetched_data[i].title
        //   new_question["isRequired"] = true
        //   new_question["colCount"] = 0
        //   new_question["choices"] = [];
        //   for(var j = 0; j < fetched_data[i].choices.length; j++){
        //     new_question["choices"].push([j + "|" + fetched_data[i].choices[j].title]);
        //   }

        //   //console.log("test" +new_question["choices"]);
        //   new_json.pages.push({
        //     questions: [new_question]
        //   });
        //}
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    console.log("componentDidMount logs");
  }

  render() {
    Survey.Survey.cssType = "bootstrap";
    this.model = new Survey.Model(this.state.json);
    
    return (
      <div className="SurveyResult">
        <div className="surveyjs" >
          {/*If you want to show survey, uncomment the line below*/}
          <Survey.Survey
            model={this.model}
            onComplete={this.onComplete}
            onValueChanged={this.onValueChanged}
          />
          {/*If you do not want to show Survey Creator, comment the line below*/}
          {/*<h1>SurveyJS Creator in action:</h1>
          <SurveyCreator /> */}
          <center>
            <table border="1" width="180" >
              <tbody id="tbody1">

              </tbody>
            </table>
          </center>
          <div id="finalScore"></div>
          <div id="jsonSection"></div>
        </div>

      </div>
    );
    
  }
}

export default NewSurvey;

