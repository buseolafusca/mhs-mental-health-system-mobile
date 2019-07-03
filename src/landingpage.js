import React from 'react';
import ReactDOM from 'react-dom';
import './landingpage.css';
import NHSHeader from './components/NHSHeader.js'
import NHSFooter from './components/NHSFooter.js'
import { fetchPublishedQuestionnaires } from './BackendService.js'

class Square extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href={this.props.url} className="box">{this.props.title}</a>
        );
    }
}

class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questionnaireList: []
        };
    }

    componentWillMount() {
        fetchPublishedQuestionnaires().then(
            response => {
                console.log(response);
                this.setState({ questionnaireList: response.questionnaireList });
            }
        );
    }

    render() {
        return (
            <div className="landing-page-container">
                <NHSHeader />
                <div className="wrapper-container">
                    <div className="wrapper">
                        {this.state.questionnaireList.map((item, key) =>
                            <Square url="/phq" title={item.title} />
                        )}
                        <Square url="/referrals" title="Referrals" />
                        <Square url="/appointments" title="Appointments" />
                        <Square url="/resources" title="Resources" />
                    </div>
                </div>
                <NHSFooter />
            </div>
        );
    }
}


export default LandingPage;

