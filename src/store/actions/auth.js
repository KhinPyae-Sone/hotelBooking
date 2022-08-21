export const addToAuth=(userInfo)=>{
    return{
        type:'ADD_TO_AUTH',
        userInfo
    }
}
export default {addToAuth}