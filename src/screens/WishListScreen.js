import React,{useState,useEffect} from 'react'
import {View,Text,SafeAreaView,Image,StyleSheet,Dimensions,TouchableOpacity,FlatList} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import wishlistAction from '../store/actions/wishlist';
import HeaderComponent from '../components/HeaderComponent'
const width=Dimensions.get('screen').width
import colors from '../constants/colors'
import BottomTabComponent from '../components/BottomTabComponent';
import wishListQtyAction from '../store/actions/wishqty'




const WishListScreen=({navigation,route})=>{
   
    const hotels = useSelector(state => state.WishList)
    const totQty= useSelector(state=>state.Wishqty)
    const dispatch = useDispatch()

    useEffect(() => {
        async function getWishListHotels() {
            let wishListData = await AsyncStorage.getItem('wishlist')
            let prods = JSON.parse(wishListData)

            if (prods == null) {
                AsyncStorage.setItem('wishlist', JSON.stringify([]))
                dispatch(wishlistAction.addToWishList([]))
            } else {
                AsyncStorage.setItem('wishlist', JSON.stringify(prods))
                dispatch(wishlistAction.addToWishList(prods))
            }
        }

        getWishListHotels()
    }, [])


    console.log("Route data",route)

    const removeWishListItem = (item) => {
        AsyncStorage.getItem('wishlist').then((data) => {
            let wishlistData = JSON.parse(data)
            let leftWishList = [];
            if (wishlistData != null) {
                leftWishList = wishlistData.filter(prod => prod._id != item._id)
            }
            dispatch(wishlistAction.addToWishList(leftWishList))
            AsyncStorage.setItem('wishlist', JSON.stringify(leftWishList))
            dispatch(wishListQtyAction.setWishQty(totQty-1))
            AsyncStorage.setItem('wishListQty',JSON.stringify(totQty-1))
         
        })
    }
  
    return(
        <SafeAreaView style={{flex:1}}>

            <HeaderComponent navigation={navigation} iconName="back" title=" WishList"/>
      
                {hotels?.length > 0? <View style={{ flex: 1, paddingHorizontal: 18 }}>
                    {
                    hotels?.length >0 && 
                 <View style={{ alignItems: 'flex-end' }}>   
                  <TouchableOpacity onPress={() => {
                                  AsyncStorage.removeItem('wishlist')
                                  dispatch(wishlistAction.addToWishList([]))
                                  AsyncStorage.setItem('wishListQty',JSON.stringify(0))
                                  dispatch(wishListQtyAction.setWishQty(0))
                                 
                              }}>
                                  
                 
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.blue }}>Remove All</Text>
                  </TouchableOpacity>
                  </View>}
                  
            
           
       

            
            <FlatList 
            data={hotels}
            renderItem={({item,index})=>{
                return(
                    
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                        hotel: item,
                        
                    })} key={index} style={{
                        flexDirection: 'row', backgroundColor: colors.white, borderRadius: 10,
                        padding: 16, marginTop: 15
                    }}>
                        <View style={{
                            width: width / 4 + 10, height: width / 4 + 10, borderRadius: 10,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image source={item.img} resizeMode="cover" style={{
                                width: "100%", height: "100%",
                                borderRadius: 10
                            }} />
                           
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <View style={{flex:1}}>
                            <Text style={{ fontSize: 16, color: colors.blue, fontWeight: 'bold' }}>{item.hotelName}</Text></View>
                            <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-between'}}>
                            <Image style={{width:20,height:20,tintColor:colors.blue}} source={require('../../assets/icons/location.png')}/>
                            <Text  style={{ fontSize: 14, color: colors.blue, fontWeight: 'bold' ,flex:1}}>{item.detailMap}</Text></View>
                            {/* <Text style={{ marginTop: 15, fontSize: 16, color: colors.text }}>{item.price}</Text> */}
                        </View>
                        
                        <TouchableOpacity onPress={() => removeWishListItem(item)} style={{ position: 'absolute', top: 5, right: -2 }}>
                            <Image source={require('../../assets/icons/delete.png')} style={{ width: 30, height: 30,tintColor:colors.blue }} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    
                )
            }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}


            />
            </View>:
          


      
        <View style={{marginHorizontal:10,marginVertical:10,justifyContent:'center',alignItems:'center',flex:1}}>
            <Text style={{fontSize:20,alignItems:'center',justifyContent:'center',color:colors.blue}}>There is no wishlist data</Text>
        </View>
        }
          <BottomTabComponent navigation={navigation} screenName="WishList" />

            
        </SafeAreaView>
    )
}

export default WishListScreen
const styles=StyleSheet.create(
    {
       
    }
  )


