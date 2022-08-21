import React, { useEffect,useState } from 'react'
import {View,Text,TouchableOpacity,Dimensions,SafeAreaView,FlatList,Image,Modal,TextInput} from 'react-native'
import {useDispatch,useSelector} from 'react-redux'
import BottomTabComponent from '../components/BottomTabComponent'
import HeaderComponent from '../components/HeaderComponent'
import colors from '../constants/colors'
import bookingAction from '../store/actions/booking'
import qtyAction from '../store/actions/qty'

import AsyncStorage from '@react-native-async-storage/async-storage';


const width=Dimensions.get('screen').width
const BookingListScreen=({navigation,route})=>{
    const hotels=useSelector(state=>state.Booking)
    const totQty=useSelector(state=>state.Qty)
    const dispatch=useDispatch()


    const starFilled=require('../../assets/icons/starfilled.png')
    const starCorner=require('../../assets/icons/star.png')
    

   
    useEffect(() => {
        const getHotels = async () => {
            let hotelData = await AsyncStorage.getItem('hotel')
            let prods = JSON.parse(hotelData)

            if (prods == null) {
                dispatch(bookingAction.addToBooking([]))
                AsyncStorage.setItem('hotel', JSON.stringify([]))
            } else {
                dispatch(bookingAction.addToBooking(prods))
                AsyncStorage.setItem('hotel', JSON.stringify(prods))
            }
        }
       
        getHotels()
    }, [])

    const deleteEach = (item) => {
        let leftBookingList = [];
        AsyncStorage.getItem('hotel').then((res) => {
            let bookingList = JSON.parse(res)
           
            if (bookingList != null) {
                leftBookingList = bookingList.filter(prod=>prod.filNum != item.filNum)
            }
            dispatch(bookingAction.addToBooking(leftBookingList))
            AsyncStorage.setItem('hotel', JSON.stringify(leftBookingList))
            
            AsyncStorage.setItem('bookingQty',JSON.stringify(totQty-1))
            dispatch(qtyAction.setTotalQty(totQty-1))
        })
    }

  
             
    return(
        <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent navigation={navigation} title="BookingList" iconName="back" />
        <View style={{ flex: 1, paddingHorizontal: 18 }}>
         {hotels?.length>0 ?
            <FlatList
                style={{ flex: 1 }}
                data={hotels}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{flex:1,borderRadius:10,backgroundColor:colors.primaryColor,borderBottomEndRadius:10,marginTop:10}}>
                            
                                <Image style={{width:'100%',height:width/2,resizeMode:'cover',borderTopLeftRadius:5,borderTopRightRadius:5}} source={item.img}
                              
                               />
                                <View style={{flexDirection:'row'}}>
                                
                                <Text style={{fontSize:19,fontWeight:'bold',color:colors.blue,marginLeft:13}}>{item.hotelName}</Text>
                                <TouchableOpacity onPress={()=>deleteEach(item)}>

                                <Image style={{width:25,height:30,marginTop:5,justifyContent:'space-evenly'}} source={require('../../assets/icons/delete.png')}/>
                                </TouchableOpacity></View>

                                <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                               
                                <View style={{flexDirection:'row',marginTop:3}}> 
                                 
                                    <Text style={{fontSize:14,marginLeft:10,color:colors.blue}}> Room:{item.room}</Text>
                                    <Text style={{fontSize:14,marginLeft:10,color:colors.blue}}>Guest:{item.guest}</Text>
                                    <Text style={{fontSize:14,marginLeft:10,color:colors.blue}}>Children:{item.child}</Text>
                                
                                </View> 
                                    
                                 
                                </View>
                                                         
                                    <Text style={{fontSize:14,marginLeft:13,color:colors.blue}}>Check in date:  {item.text}</Text>
                                   
                                    <Text style={{fontSize:14,marginLeft:10,color:colors.blue}}> Check Out Date: {item.text1}</Text>
                                    <Text style={{fontSize:14,marginLeft:13,color:colors.blue}}>Welcome:  {item.name}</Text>
                                    <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:18,color:colors.green,marginLeft:14}}>Your Booking is confirmed</Text>
                                     <Image style={{width:25,height:25,tintColor:colors.green}} source={require('../../assets/icons/check.png')}/>
                                    </View>
                                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',backgroundColor:colors.blue,height:40,width:'50%',borderRadius:5,marginEnd:6}} 
                                    onPress={()=>
                                    {
                                        navigation.navigate("Modal",
                                        {
                                            review:item
                                        })
                                    }}>
                                   
                                        <Text style={{color:colors.white,fontSize:15}}> Write Review</Text>
                                   </TouchableOpacity>

                                    
                               
                                </View>
                               
                             
                          
                      
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <TouchableOpacity onPress={() => {
                        AsyncStorage.removeItem('hotel')
                        dispatch(bookingAction.addToBooking([]))
                        AsyncStorage.removeItem('bookingQty')
                        dispatch(qtyAction.setTotalQty(0))
                     
                       
                    }} style={{ marginVertical: 15, height: 50, backgroundColor: colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold' }}>Delete</Text>
                    </TouchableOpacity>
                }
            />:<View style={{alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:20,color:colors.blue}}>There is no booking history!</Text>

            </View>}
            


        </View>
        <BottomTabComponent navigation={navigation} screenName="HotelBooking" />
    </SafeAreaView>
    )
}
export default BookingListScreen