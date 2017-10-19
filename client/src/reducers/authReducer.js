import { FETCH_USER } from '../actions/types';

//Create a reducers and export it. 
//state initially starts of as undefined. 
export default function (state = {}, action) {

    switch (action.type) {
        //If the user is logged in
        case FETCH_USER: 
            //the user model, return true if filled, returns false if the string is false. 
            return action.payload || false;
        default:
            return state;
    }
}