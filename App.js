import React from 'react'
import Navigator from './src/routes/Navigator'
import rootReducer from './src/store/reducers'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
const Store= createStore(rootReducer)


const App=()=>{
  return(
    <Provider store={Store}>
      <Navigator/>
      

    </Provider>
    
    
      
  )
    
  
}
export default App