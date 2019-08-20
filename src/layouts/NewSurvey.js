import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "icheck/skins/square/blue.css";
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
import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'
import { getQuestionnaire, postAnswers } from '../services/BackendService';
import "../assets/css/NewSurvey.css";
import 'bootstrap'
window["$"] = window["jQuery"] = $;
require("icheck");

Survey.StylesManager.applyTheme("darkblue");
Survey.Serializer.addProperty("question", "hint:text");
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
        title: "",
        description: "",
        completedHtml: "",
        pages: [],
        showProgressBar: ""
      },
      rules: [],
      score: 0,
      hints:{}
    };
    this.showDescription=this.showDescription.bind(this)
  }

  /* The following 4 methods are needed by SurveyJS */
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
    postAnswers(this.model, this.state);
  };

  componentWillMount() {

    const { id } = this.props.match.params;

    const url = id;

    getQuestionnaire(url)
      .then(fetchedData => {
        var hint={}
        fetchedData.body.pages.forEach(element => {
          element.elements.forEach(question=>{
            hint[question.name]=question.hint
          })
        });
        this.setState({ json: fetchedData.body, rules: fetchedData.rules, hints:hint});
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  showDescription(element) {
      document.getElementById("questionDescriptionText").innerHTML = this.state.hints.element.name;
      $("#questionDescriptionPopup").modal();
  }

  onAfterRenderQuestion(survey, options) {
    if(!options.question.hint) return;
    var btn = document.createElement("div");
    btn.type = "button";
    btn.className = "btn btn-info btn-xs";
    btn.innerHTML = "?";
    var question = options.question;
    console.log(survey)
    btn.onclick = () =>{
      console.log(options.question)
      document.getElementById("questionDescriptionText").innerHTML = options.question.hint
      $("#questionDescriptionPopup").modal();

    }

    var header = options.htmlElement.querySelector("h5");
    var span = document.createElement("span");
    span.innerHTML = "  ";
    header.appendChild(span);
    header.appendChild(btn);
  }



  render() {
    Survey.Survey.cssType = "bootstrap";
    this.model = new Survey.Model(this.state.json);
    console.log(this.state.json)
    this.model.onAfterRenderQuestion.add(this.onAfterRenderQuestion)

    return (

      <div id="page-container">
        <NHSHeader />
        <div id="questionDescriptionPopup" class="modal fade" role="dialog">
          <div class="modal-dialog">

            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Information</h4>
              </div>
              <div class="modal-body">
                <p><div id="questionDescriptionText"></div></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>
        <div className="SurveyResult">
          <div className="surveyjs" >
            <Survey.Survey
              model={this.model}
              onComplete={this.onComplete}
              onValueChanged={this.onValueChanged}
            />
            <center>
              <table border="1" width="180" >
                <tbody id="tbody1">
                </tbody>
              </table>
            </center>

          </div>
        </div>
        <NHSFooter />
      </div>
    );

  }
}

export default NewSurvey;

