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
    this.state = { json: 
      {
        title: "PHQ-9",
        showProgressBar: "top",
        pages: [],
        completedHtml: "<center><p><h4>Your Score</h4></p>"
      }
    } ;
  }

  sendResult(){
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
  
  onComplete(result) {
    var item = 0;
    console.log("Complete! ");
    console.log(result.valuesHash);
    //console.log(result.valuesHash.Question1);
    Object.keys(result.valuesHash).map(function (key) {
      item = item + parseInt(result.valuesHash[key], 10) ;
      console.log(item);
    })
    console.log("Final Result:" + item);
  }

  onComplete2 = (result) => {
    var finalScore = 0;
    var tableData;
    var i = 1;
    var temp;
    console.log("Complete! ");
    console.log(result);
    console.log(result.valuesHash);
    console.log(result.valuesHash.Question1);
    Object.keys(result.valuesHash).map(function (key) {
      tableData+="<tr>"
      tableData += "<td align='center'>" + "Question " + i + "</td>"
      finalScore = finalScore + parseInt(result.valuesHash[key], 10);
      temp = parseInt(result.valuesHash[key], 10);
      tableData+="<td align='center'>"+temp+"</td>";
      console.log(finalScore);
      tableData+="</tr>"
      i++;
    })

    $("#tbody1").html(tableData);
    document.querySelector('#finalScore').textContent = "Final score is " + finalScore;
  };


  componentWillMount() {
    console.log("componentWillMount logs");
    const id = "5d0ce7a7fc101609e9765de6";

    const testUrl = "http://178.128.34.125/api/v1/questions";

    getQuestionnaire(testUrl)
      .then(fetched_data => {
        console.log(fetched_data)
        console.log(this.state.json)
        var new_json = this.state.json;
        console.log(new_json);
        console.log(new_json.pages);

        for (var i = 0; i < fetched_data.length; i++) { 
          console.log(i);
          // var questions = []
          var new_question = {};
          new_question["type"] = "radiogroup"
          new_question["name"] = "Question" + (i + 1)
          new_question["title"] = fetched_data[i].title
          new_question["isRequired"] = true
          new_question["colCount"] = 0
          new_question["choices"] = [];
          for(var j = 0; j < fetched_data[i].choices.length; j++){
            new_question["choices"].push([j + "|" + fetched_data[i].choices[j].title]);
          }
          
          //new_question["choices"] = ["1|Not At All", "2|Several Days", "3|More the half the days", "4|Nearly"]
          console.log("test" +new_question["choices"]);
          new_json.pages.push({
            questions: [new_question]
          });
        }

        this.setState({ new_json });

      })
      .catch(error => {
        console.error(error);
      });
    

    // console.log(typeof fetched_data);

    // for (var i = 0; i < 3; i++) { 
    //   console.log(fetched_data.result[i]);
    // }
    // this.setState({ json });

  }

  componentDidMount() {
    console.log("componentDidMount logs");
  }

  render() {
    Survey.Survey.cssType = "bootstrap";
    this.model = new Survey.Model(this.state.json);
    return (
      <div className="SurveyResult">
        <div className="surveyjs">
          {/*If you want to show survey, uncomment the line below*/}
          <Survey.Survey
            model={this.model}
            onComplete={this.onComplete2}
            onValueChanged={this.onValueChanged}

          />
          {/*If you do not want to show Survey Creator, comment the line below*/}
          {/*<h1>SurveyJS Creator in action:</h1>
          <SurveyCreator /> */}
          <center>
            <table border = "1" width = "180" >
              <tbody id="tbody1">
              </tbody>
            </table>
          </center>
          <div id="finalScore"></div>
        </div>
        
      </div>
    );
  }
}

export default NewSurvey;


      //   ,
      //    {
      //   questions: [
      //     {
      //       "type": "radiogroup",
      //       "name": "Question2",
      //       "title": "Feeling down, depressed, or hopeless",
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
      //   {
      //     questions: [
      //       {
      //         "type": "radiogroup",
      //         "name": "Question9",
      //         "title": "Thoughts that you would be better off dead or of hurting yourself in some way",
      //         "isRequired": true,
      //         "colCount": 0,
      //         "choices": ["1|Not At All", "2|Several Days", "3|More the half the days", "4|Nealy"]
      //       }
      //     ]
      //   }

     
