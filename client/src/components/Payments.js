import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

//StripeCheckout defaults to using US Dollars. 
/**
 * Properties: 
 *  amount: takes it in cents so $5 = 500 cents.
 *  token: the token that we get back from Stripe when we send the payment info to Stripe so it will be a call back function
 */

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">Add Credits </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);