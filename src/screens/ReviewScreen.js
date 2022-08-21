import React,{useEffect} from 'react'
import {View,Text,SafeAreaView,Image,FlatList,TouchableOpacity} from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { useDispatch,useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import reviewAction from '../store/actions/reviewlist'
import colors from '../constants/colors'
import nameAction from '../store/actions/auth'

const ReviewScreen=({navigation,route})=>{


const reviewData=useSelector(state=>state.REVIEW)
console.log('Data from Review',reviewData)
const userName=useSelector(state=>state.USERINFO)
    console.log("data from modal",reviewData)
    
    const dispatch=useDispatch()

   
    useEffect(()=>{

        const getUserName = async() => {
    
            const userNameFromAsync = await AsyncStorage.getItem('userInfo')
        
            const userInfo = JSON.parse(userNameFromAsync)
        
            if(userInfo == null){
        
                AsyncStorage.setItem('userInfo', JSON.stringify([]))
                dispatch(nameAction.addToAuth([]))
        
            }
        
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                dispatch(nameAction.addToAuth(userInfo))
        
        
            }
        const getData=async()=>{
            const reviewDataFromAsync=await AsyncStorage.getItem('reviewList')
            const getReviewData=JSON.parse(reviewDataFromAsync)
            if(getReviewData == null){

                AsyncStorage.setItem('reviewList',JSON.stringify([]))
                dispatch(reviewAction.addToReview([]))
            }else{
                AsyncStorage.setItem('reviewList',JSON.stringify(getReviewData))
                dispatch(reviewAction.addToReview(getReviewData))
            }
        }
        getUserName()
        getData()
        
    },[route])

    return(
        <SafeAreaView style={{flex:1}}>
            <HeaderComponent  navigation={navigation} title="Reviews" icon="back"/>
            {reviewData?.length > 0 ?
            <FlatList
            data={reviewData}
            renderItem={({item,index})=>{
                return(
                    <View style={{flex:1}}>
                       <Text>{item.data}</Text>
                       <Text>Rating:
                        <Image  style={{width:25,height:25}} source={(require('../../assets/icons/starfilled.png'))}/>
                        {item.rating}
                        </Text>
                       <Text>{userName}</Text>
                       <Text>{item.showDate}</Text>

                    </View>
                )
            }}
            keyExtractor={(item, index) => index.toString()}/>
            :
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text>There is no review data</Text>
            </View>}
          <TouchableOpacity onPress={()=>{
            AsyncStorage.removeItem('reviewList')
            dispatch(reviewAction.addToReview([]))
          }}>
         <View style={{alignItems:'center',justifyContent:'center',height:40,backgroundColor:colors.green}}>
            <Text style={{color:colors.blue,fontSize:16}}>Remove all</Text>
         </View></TouchableOpacity> 
          
        </SafeAreaView>
    )
}
export default ReviewScreen
