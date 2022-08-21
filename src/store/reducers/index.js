import WishList from './wishlist'
import Booking from './booking'
import Qty from './qty'
import Wishqty from './wishqty'

import COUNTSIGN from './count'
import CREATEUSER from './createuser'
import REVIEW from './reviewlist'
import USERINFO from './auth'


import {combineReducers} from 'redux'

const rootReducer=combineReducers({
    WishList,
    Booking,
    Qty,
    Wishqty,
    USERINFO,
  
    COUNTSIGN,
    CREATEUSER,REVIEW
  
    

})
export default rootReducer