const CountReducer=(state=null,action)=>{
    switch(action.type){
        case 'ADD_TO_COUNTSIGN':
            return action.count

            default:
            return state
    }
}
export default CountReducer