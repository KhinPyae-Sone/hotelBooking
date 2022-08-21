import React, { useState,useEffect } from 'react'
import {View,Text,TouchableOpacity,Image, Dimensions,StyleSheet} from 'react-native'
import colors from '../constants/colors'
import { useSelector,useDispatch } from 'react-redux'
import qtyAction from '../store/actions/qty'
import wishlistQtyAction from '../store/actions/wishqty'
import AsyncStorage from '@react-native-async-storage/async-storage';
import bookingAction from '../store/actions/booking'


const width=Dimensions.get('screen').width

const BottomTabComponent=({navigation,screenName})=>{
    const qty=useSelector(state=>state.Qty)
    const wishqty=useSelector(state=>state.Wishqty)
    const dispatch=useDispatch()

    useEffect(()=>{
        async function getQty(){
            let qtyData=await AsyncStorage.getItem('bookingQty')
            let qty=JSON.parse(qtyData)

            if (qty==null){
                dispatch(qtyAction.setTotalQty(0))
                AsyncStorage.setItem('bookingQty',JSON.stringify(0))
            }else{
                dispatch(qtyAction.setTotalQty(qty))
                AsyncStorage.setItem('bookingQty',JSON.stringify(qty))
            }

        }
        getQty()

        
      
    },[navigation,qty])

    

  useEffect(()=>{
      async function getWishQty(){
        let wishQtyData=await AsyncStorage.getItem('wishlistQty')
        let wishqty=JSON.parse(wishQtyData)

        if(wishqty==null){
            dispatch(wishlistQtyAction.setWishQty(0))
            AsyncStorage.setItem('wishListQty',JSON.stringify(0))
            dispatch(wishlistQtyAction.setWishQty(wishqty))
            AsyncStorage.setItem('wishListQty',JSON.stringify(wishqty))
        }
      }
      getWishQty()
   
  },[navigation,wishqty])


    return(
        <View style={styles.Container}>
            <TouchableOpacity style={styles.touch} onPress={()=>navigation.navigate('Home')}>
                <Image  source={require('../../assets/icons/home.png')} style={[styles.Icon,{tintColor:screenName =="Home"? '#000080': 'gray'}]} />
                <Text style={[styles.text,{color:screenName=='Home'? '#000080': 'gray'}]}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.touch} onPress={()=>navigation.navigate('WishList')}>
                <Image  source={require('../../assets/icons/fav.png')} style={[styles.Icon,{tintColor:screenName =="WishList"? '#000080': 'gray'}]} />
             {wishqty != 0 &&
               <View style={{position:'absolute',top:-5,right:0,marginTop:5,borderRadius:11,marginRight:width/8-22,width:22,
               height:22,justifyContent:'center',alignItems:'center',backgroundColor:'#42BD37'}}>
                   <Text style={{color:colors.white,fontSize:15}}>{wishqty}</Text>
                   </View>} 
              
                <Text style={[styles.text,{color:screenName=='WishList'? '#000080': 'gray'}]}>WishList</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touch} onPress={()=>{navigation.navigate('BookingList')}
       
        //  AsyncStorage.removeItem('bookingQty')
        //  dispatch(qtyAction.setTotalQty(0)) 
         }>
                <Image  source={require('../../assets/icons/bookinglist.png')} style={[styles.Icon,{tintColor:screenName =="BookNow"? '#000080': 'gray'}]} />
                {qty != 0 &&<View style={{position:'absolute',top:-5,right:0,marginTop:5,borderRadius:11,
                             marginRight:width/8-22,width:22,height:22,justifyContent:'center',
                             alignItems:'center',backgroundColor:'#42BD37'}}>
                    <Text style={{color:colors.white,fontSize:15}}>{qty}</Text>
                    </View>}
              
                <Text style={[styles.text,{color:screenName=='BookingList'? '#000080': 'gray'}]}>BookingList</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch} onPress={()=>navigation.navigate('Profile')}>
                <Image  source={require('../../assets/icons/user.png')} style={[styles.Icon,{tintColor:screenName =="Profile"? '#000080': 'gray'}]} />
                <Text style={[styles.text,{color:screenName=='Profile'? '#000080': 'gray'}]}>Profile</Text>
            </TouchableOpacity>
           
           
        </View>

    )
}
const styles=StyleSheet.create({
    Container:{flexDirection:'row',height:60,backgroundColor:'#fff'},
    touch:{width:width/4,justifyContent:'center',alignItems:'center'},
    Icon:{width:25,height:25},
    text:{fontSize:14,color:colors.blue}

})
export default BottomTabComponent