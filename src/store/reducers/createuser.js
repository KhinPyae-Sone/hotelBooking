const createUserReducer=(state=null,action)=>{
    switch(action.type){
        case "CREATE_USER":
            return action.createUser
            
            default:
                return state
    }
}
export default createUserReducer;