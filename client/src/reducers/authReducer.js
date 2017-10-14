//Create a reducers and export it. 
//state initially starts of as undefined. 
export default function (state = {}, action) {
    console.log(action);
    switch (action.type) {
        default:
            return state;
    }
}