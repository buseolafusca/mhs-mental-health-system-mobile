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
import getQuestionnaire from './BackendService';

import "icheck/skins/square/blue.css";
window["$"] = window["jQuery"] = $;
require("icheck");

Survey.StylesManager.applyTheme("default");

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

  json = {
    title: "PHQ-9",
    showProgressBar: "top",
    pages: [
      {
        elements: [
          {
            "type": "radiogroup",
            "name": "Question1",
            "title": "Little interest or pleasure in doing things",
            "isRequired": true,
            "colCount": 0,
            "choices": ["1|Not At All", "2|Several Days", "3|More the half the days", "4|Nealy"]
          }
        ]
      },
      {
        questions: [
          {
            "type": "radiogroup",
            "name": "Question2",
            "title": "Feeling down, depressed, or hopeless",
            "isRequired": true,
            "colCount": 0,
            "choices": ["1|Not At All", "2|Several Days", "3|More the half the days", "4|Nealy"]
          }
        ]
      },
      // {
      //   questions: [
      //     {
      //       "type": "radiogroup",
      //       "name": "Question3",
      //       "title": "Trouble falling or staying asleep, or sleeping much.",
      //       "isRequired": true,
      //       "colCount": 0,
      //       "choices": ["1|Not At All", "2|Several Days", "3|More the half the days", "4|Nealy"]
      //     }
      //   ]
      // },
      // {
      //   questions: [
      //     {
      //       "type": "radiogroup",
      //       "name": "Question4",
      //       "title": "Feeling tired or having little energy",
      //       "isRequired": true,
      //       "colCount": 0,
      //       "choices": ["1|Not At All", "2|Several Days", "3|More the half the days", "4|Nealy"]
      //     }
      //   ]
      // },
      // {
      //   questions: [
      //     {
      //       "type": "radiogroup",
      //       "name": "Question5",
      //       "title": "Poor appetite or overeating",
      //       "isRequired": true,
      //       "colCount": 0,
      //       "choices": ["1|Not At All", "2|Several Days", "3|More the half the days", "4|Nealy"]
      //     }
      //   ]
      // },
      // {
      //   questions: [
      //     {
      //       "type": "radiogroup",
      //       "name": "Question6",
      //       "title": "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
      //       "isRequired": true,
      //       "colCount": 0,
      //       "choices": ["1|Not At All", "2|Several Days", "3|More the half the days", "4|Nealy"]
      //     }
      //   ]
      // },
      // {
      //   questions: [
      //     {
      //       "type": "radiogroup",
      //       "name": "Question7",
      //       "title": "Trouble concentrating on things, such as reading the newspaper or watching television.",
      //       "isRequired": true,
      //       "colCount": 0,
      //       "choices": ["1|Not At All", "2|Several Days", "3|More the half the days", "4|Nealy"]
      //     }
      //   ]
      // },
      // {
      //   questions: [
      //     {
      //       "type": "radiogroup",
      //       "name": "Question8",
      //       "title": "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving .around a lot more than usual",
      //       "isRequired": true,
      //       "colCount": 0,
      //       "choices": ["1|Not At All", "2|Several Days", "3|More the half the days", "4|Nealy"]
      //     }
      //   ]
      // },
      {
        questions: [
          {
            "type": "radiogroup",
            "name": "Question9",
            "title": "Thoughts that you would be better off dead or of hurting yourself in some way",
            "isRequired": true,
            "colCount": 0,
            "choices": ["1|Not At All", "2|Several Days", "3|More the half the days", "4|Nealy"]
          }
        ]
      }
    ],
    completedHtml: "<p><h4>Your Score</h4></p><p>Question 1:<b>{item}</b></p>"
  };

  sendResult(){
    console.log("value changed!");
  }

  onValueChanged(result) {
    console.log("value changed!");
  }

  sendResultOnPageNext() {
    console.log("sendResultOnPageNext");
  }


  goNextPageAutomatic() {
    console.log("goNextPageAutomatic");
  }
  
  onComplete(result) {
    var item = 0;
    console.log("Complete! ");
    console.log(result);
    console.log(result.valuesHash);
    //console.log(result.valuesHash.Question1);
    Object.keys(result.valuesHash).map(function (key) {
      item = item + parseInt(result.valuesHash[key], 10) ;
      console.log(item);
    })
    console.log("Final Result:" + item);

  }


  componentWillMount() {
    console.log("componentWillMount logs");
    const id = "5d0ce7a7fc101609e9765de6";

    getQuestionnaire(id);
  }

  componentDidMount() {
    console.log("componentDidMount logs");
  }

  render() {
    Survey.Survey.cssType = "bootstrap";
    var model = new Survey.Model(this.json);

    return (
      <div className="App">
        <div className="surveyjs">
          {/*If you want to show survey, uncomment the line below*/}
          <Survey.Survey
            model={model}
            onComplete={this.onComplete}
            onValueChanged={this.onValueChanged}

          />
          {/*If you do not want to show Survey Creator, comment the line below*/}
          {/*<h1>SurveyJS Creator in action:</h1>
          <SurveyCreator /> */}
        </div>
       
      </div>
    );
  }
}

export default NewSurvey;
