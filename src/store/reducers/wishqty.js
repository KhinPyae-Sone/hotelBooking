const QtyReducer=(state=0,action)=>{
    switch(action.type){
    case 'SET_WISH_QTY':
    return action.wishQty

    default:
        return state
}}
export default QtyReducer
