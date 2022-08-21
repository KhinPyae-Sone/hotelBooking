const bookingReducer=(state=null,action)=>{
    switch(action.type){
        case 'ADD_TO_BOOKING':
            return action.hotels

            default:
            return state
    }
}
export default bookingReducer