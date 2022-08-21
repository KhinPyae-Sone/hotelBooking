const reviewlistReducer=(state=null,action)=>{
    switch(action.type){
        case 'ADD_TO_REVIEW_LIST':
            return action.reviewList;
        default:
            return state;
    }
}
export default reviewlistReducer;