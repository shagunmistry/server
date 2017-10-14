//All of our action creator code. 

//AXIOS is used to make AJAX requests to our backend API
import axios from 'axios';
//import action type
import { FETCH_USER } from './types';

/**
 * Since ReduxThunk was passed in Middleware in src/Index.js, 
 * It inspects whatever value we create from this action creator. If it sees that we returned a func (instead of a normal action), 
 * ReduxThunk will automatically call this function and pass in Dispatch function as an argument. 
 */

export const fetchUser = () => {
    return function (dispatch) {
        //We do not want to dispatch this action until its API request & the promise which it returns has been resolved 
        //What happens here: whenever the action creator is called (fetchUser), it will return the function and ReduxThunk
        //will automatically pass in dispatch(explained above). We then make a request and wait till we get response from api
        //and only then we dispatch our action. 
        //Put the relative path to the current user.
        axios.get('/api/cur_user')
            .then(res => ({ type: FETCH_USER, payload: res }));
    }

};

