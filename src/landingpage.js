import React from 'react';
import ReactDOM from 'react-dom';
import './landingpage.css';
import { Link } from "react-router-dom";


class Square extends React.Component{

    constructor(props){
        super(props);
    }
 
    render() {
        return (
//             <a href={this.props.url} className="box">{this.props.title}</a>
            <Link to={this.props.url}>{this.props.title}</Link>
        );
    }
}

class LandingPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <div className="wrapper">
            <Square url="/phq" title="PHQ-9"/>
            <Square url="/referrals" title="Referrals"/>
            <Square url="/appointments" title="Appointments"/>
            <Square url="/resources" title="Resources"/>
            </div>
        );
    }
}

export default LandingPage;

