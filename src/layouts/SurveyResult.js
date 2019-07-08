import React from 'react';
import logo from './logo.svg';
import './SurveyResult.css';

function SurveyResult() {
  return (
    <div className="SurveyResult">
      <header className="SurveyResult-header">
        <img src={logo} className="SurveyResult-logo" alt="logo" />
        <p>
          Edit <code>src/SurveyResult.js</code> and save to reload.
        </p>
        <a
          className="SurveyResult-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default SurveyResult;
