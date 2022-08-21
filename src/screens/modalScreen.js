import React,{useState} from 'react'
import {View,Text,Modal,TextInput,TouchableOpacity,Image} from 'react-native'
import colors from '../constants/colors'
import {useDispatch,useSelector} from 'react-redux'
import reviewAction from '../store/actions/reviewlist'
import { Rating } from 'react-native-elements'
import authAction from '../store/actions/auth'

import AsyncStorage from '@react-native-async-storage/async-storage'
const ModalScreen=({navigation,route})=>{


    const starFilled=require('../../assets/icons/starfilled.png')
    const starCorner=require('../../assets/icons/star.png')
    const dispatch=useDispatch()
    const [data,setData]=useState('') 
    const [showDate,setShowDate]=useState('')
    const [rating,setRating]=useState('')

    const {review}=route.params 
  
   const userName=useSelector(state=>state.USERINFO)

   const userNameShow=(userName)=>{
    AsyncStorage.setItem('userInfo',JSON.stringify(userName))
    dispatch(authAction.addToAuth(userName))
   }
    const saveToReview=(review)=>{

        let currentDate=new Date()
        let fDate=currentDate.getDate() + '/'+(currentDate.getMonth()+1) + '/' +currentDate.getFullYear()
        setShowDate(fDate)
       
       review.data=data
       review.rating=rating
       review.showDate=showDate
      console.log('review hotel rating',review.rating)

    AsyncStorage.getItem('reviewList').then((res)=>{
        const hotelData=JSON.parse(res)
        let hotelArr=[]

        if (hotelData == null){
            hotelArr.push(review)

            AsyncStorage.setItem('reviewList',JSON.stringfy(hotelArr))
            dispatch(reviewAction.addToReview(hotelArr))
        }else{
            hotelArr.push(review)

            AsyncStorage.setItem('reviewList',JSON.stringify(hotelData))
            dispatch(reviewAction.addToReview(hotelData))
        }
    })   
      
        

     
         setData('')
         setRating('')
         
        

        
    }

    // const CustomRatingBar=()=>{
    //     return(
  
    //         <View style={{justifyContent:'center',flexDirection:'row',marginTop:10}}>
                
    //             {
    //                 maxRating.map((item,key)=>{
    //                     return(
    //                         <TouchableOpacity
    //                         activeOpacity={0.7}
    //                         key={item}
    //                         onPress={()=>setDefaultRating(item)}>
    //                            <Image 
    //                            style={{width:40,height:40,resizeMode:'cover'}}
    //                            source={
    //                             item <= defaultRating
    //                             ? starFilled 
    //                             :
    //                             starCorner
    //                            }
    //                             />

    //                         </TouchableOpacity>
    //                     )
    //                 })
    //             }
    //         </View>
    //     )

    // }
    return( 


                                       <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.8)'}}>
                                            <View style={{paddng:20,width:'90%',borderRadius:10,backgroundColor:colors.white}}>
                                                <View style={{backgroundColor:colors.primaryColor,padding:10,borderWidth:1,paddingHorizontal:10,
                                                borderColor:colors.blue,shadowRadius:10,elevation:10,top:-20,alignItems:'center',justifyContent:'center',
                                                marginLeft:35,marginRight:35,borderRadius:10}}>
                                                <Text style={{fontSize:20,color:colors.blue,fontWeight:'bold',textAlign:'center'}}>Please Rate Us</Text>
                                                </View>
                                                
                                              <Rating
                                              showRating
                                              fractions={1}
                                              startingValue={1}
                                              ratingImage={starCorner}
                                              ratingCount={5}
                                              ImageSize={30}
                                              onFinishRating={(value)=>setRating(value)}
                                              
                                              style={{paddingVertical:10}}/>
                                                <View style={{height:'40%',padding:10,borderColor:colors.blue,borderWidth:1,paddingHorizontal:10,paddingVertical:10,
                                                marginLeft:10,marginRight:10,borderRadius:10
                                            }}>
                                                  <TextInput
                                                 
                                                  placeholder='Write Here'
                                                  placeholderTextColor={colors.blue}
                                                  value={data}
                                                  autoFocus={true}
                                                  editable={true}
                                                  multiline={true} 
                                                  onChangeText={text=>setData(text)}
                                                  /></View>
                                                <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:15}}>
                                                    <TouchableOpacity style={{backgroundColor:colors.blue,width:70,borderRadius:5,alignItems:'center',justifyContent:'center',paddingVertical:7}}
                                                    onPress={()=>{navigation.navigate('BookingList'),saveToReview(review)
                                                    
                                                    }}>
                                                                                                 
                                                        <Text style={{fontSize:16,color:colors.white}}>Ok</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:colors.blue,width:70,borderRadius:5,alignItems:'center',justifyContent:'center',paddingVertical:7}} onPress={()=>navigation.navigate('BookingList')}>
                                               
                                                        <Text style={{fontSize:16,color:colors.white,marginLeft:10}}>Cancel</Text>
                                                        </TouchableOpacity>
                                                </View>

                                            </View>
                                        

                                   
                                  
                               
            
        </View>
    )
}
export default ModalScreen