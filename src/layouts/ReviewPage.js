import React, { Component } from "react";
import {fetchUserAnswers} from "../services/BackendService";
import $ from "jquery";
import NHSHeader from '../components/NHSHeader.js'
import NHSFooter from '../components/NHSFooter.js'
import "../assets/css/ReviewPage.css";

class ReviewPage extends Component {
    constructor (props) {
      super(props)
      this.state = { userAnswers: []
      }
    }
  
    componentWillMount () {
        
      fetchUserAnswers()
        .then(response => {
          var rows = []
          var tableData;
          this.setState({ userAnswers: response})
          for (var i = 0; i < response.length; i++) {
            var row = [response[i].title, 'PENDING']
            rows.push(row)
            tableData += "<tr class='nhsuk-table__row' data-id=" + response[i]._id + " >"

            tableData += "<td class='nhsuk-table__cell'>" + response[i].title + "</td>"

            tableData += "<td class='nhsuk-table__cell'>" + 'PENDING' + "</td>"
            tableData += "</tr>"
          }
          $("#tbody1").html(tableData);
          this.addRowHandlers();
        })
        .catch(error => {
          console.error(error)
        })
    }
  
    addRowHandlers() {
        var table = document.getElementById("tbody1");
        var rows = table.getElementsByTagName("tr");
        for (var i = 0; i < rows.length; i++) {
          var currentRow = table.rows[i];
          var createClickHandler = function(row) {
            return function() {
              window.location.href='result/' + row.getAttribute('data-id');
            };
          };
          currentRow.onclick = createClickHandler(currentRow);
        }
      }
  
    render () {
      return ( 
        <div id = "page-container">
          <NHSHeader/>
            <div class="nhsuk-table-responsive" id = 'table-contain'>
                <table id = "get-table" class="nhsuk-table">
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
            <NHSFooter/>
        </div>
      )
    }
  }

export default ReviewPage