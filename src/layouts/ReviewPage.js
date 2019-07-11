import React, { Component } from "react";
import {fetchUserAnswers} from "../services/BackendService";
import $ from "jquery";

class ReviewPage extends Component {
    constructor (props) {
      super(props)
      this.state = { userAnswers: []
      }
    }
  
    componentWillMount () {
      fetchUserAnswers()
        .then(response => {
          console.log(response)
          var rows = []
          var tableData;
          for (var i = 0; i < response.length; i++) {
            var row = [response[i].title, 'PENDING']
            rows.push(row)

            tableData += "<tr class='nhsuk-table__row'>"
            tableData += "<td class='nhsuk-table__cell'>" + response[i].title + "</td>"

            tableData += "<td class='nhsuk-table__cell'>" + 'PENDING' + "</td>"
            tableData += "</tr>"
          }
          //this.setState({ userAnswers: rows })
          $("#tbody1").html(tableData);
        })
        .catch(error => {
          console.error(error)
        })
    }
  
    render () {
      return (
   
       <div class="nhsuk-table-responsive">
        <table class="nhsuk-table">
            <caption class="nhsuk-table__caption">Your Questionnaire Status</caption>
            <thead class="nhsuk-table__head">

                <tr class="nhsuk-table__row">
                    <th class="nhsuk-table__header" scope="col">Questionnaire</th>
                    <th class="nhsuk-table__header" scope="col">Status</th>
                </tr>
            </thead>
            
            <tbody class="nhsuk-table__body" id = "tbody1">
           
            </tbody>
        </table>
        </div>
  
      )
    }
  }

export default ReviewPage