const userReducer=(state=null,action)=>{
    switch(action.type){
        case 'ADD_To_AUTH':
            return action.userInfo

            default:
                return state
    }
}
export default userReducer