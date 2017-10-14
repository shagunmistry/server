import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// use connectFunction To connect between React and Redux.
import { connect } from 'react-redux';
//Import all the diff action creators from the actions folder. 
import * as actions from '../actions';

import Header from './Header';
//Dummy components that will be replaced later
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {

    /**
     * Go and fetch the current user informtation
     * Using "didMount" because it's looked as the preferred place to look up initial AJAX requests compared to "willMount"
     */
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    };

};

//Connecting React to Redux
//1st Arg reserved from map-state to Prop function, 
//2nd Arg = pass in all different action creators
//Now they are in Props.
export default connect(null, actions)(App);