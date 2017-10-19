import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

    /**
     * HelperMethod: If the user is logged in, show this, if not  show the other thing. 
     */
    renderContent() {
        switch (this.props.auth) {
            //Waiting on Request to be resolved.
            case null:
                return 'Waiting for request to be resolved';
            //user is logged out.
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                )
            //if not null/false, they must be logged.
            default:
                return (
                    [
                        <li key="1"><Payments /></li>,
                        <li key="3" style={{ margin: '0 10px' }}>
                            Credits: {this.props.auth.credits}
                        </li>,
                        <li key="2"><a href="/api/logout">Log Out</a></li>
                    ]
                );
        }
    }
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <Link
                            to={this.props.auth ? '/surveys' : '/'}
                            className="brand-logo"
                        >
                            Emaily
                        </Link>
                        <ul id="nav-mobile" className="right">
                            {this.renderContent()}
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}

/**
 * Gets called with the entire state object out of the redux store
 * Returns the AUTH which shows whether or not the user is logged in and if he is, return his information. 
 */
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Header);