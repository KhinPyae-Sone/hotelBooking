import React,{useState,useEffect} from 'react'
import {SafeAreaView,View,Text,TouchableOpacity,Image, Dimensions,ScrollView} from 'react-native'
import BottomTabComponent from '../components/BottomTabComponent'
import HeaderComponent from '../components/HeaderComponent'

import colors from '../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch,useSelector } from 'react-redux'
import wishlistAction from '../store/actions/wishlist'
import wishListQtyAction from '../store/actions/wishqty'


const width=Dimensions.get('screen').width

const DetailScreen=({navigation,route})=>{
  const wishqtyfromredux=useSelector(state=>state.Wishqty)
    let {hotel}=route.params
    const [isInWishlist, setIsInWishlist] = useState(false)
    const dispatch = useDispatch()


   

    useEffect(() => {
      AsyncStorage.getItem('wishlist').then((res) => {
        const wishListData = JSON.parse(res)
        if(wishListData == null ){
            setIsInWishlist(false)
        }else{
          let isWishListId = null
          for(let i=0; i<wishListData.length; i++){
            if(wishListData[i]._id == hotel._id){
              isWishListId = hotel._id
            }
          }
          if(isWishListId != null){
            setIsInWishlist(true)
          }else{
            setIsInWishlist(false)
          }
        }
      })
    }, [route])

  


  
    
  
    const addToWishList = (hotel) => {
  
       hotel.qty=1
      let wishListQty=hotel.qty 
      if(isInWishlist){
      
        AsyncStorage.getItem('wishlist').then((res) => {
          const wishListData = JSON.parse(res)
          let hotels = []
          if(wishListData != null){
            hotels = wishListData.filter(prod => prod._id !=hotel._id)
          }
          AsyncStorage.setItem('wishlist', JSON.stringify(hotels))
          dispatch(wishlistAction.addToWishList(hotels))
          AsyncStorage.setItem('wishListQty', JSON.stringify(wishqtyfromredux-1))
          dispatch(wishListQtyAction.setWishQty(wishqtyfromredux-1))
          

        })
        setIsInWishlist(false)
      }else{
        AsyncStorage.getItem('wishlist').then((res) => {
          const wishListData = JSON.parse(res)
          let hotels = []
          if(wishListData == null){
           hotels.push(hotel)
            
            dispatch(wishlistAction.addToWishList(hotels))
            AsyncStorage.setItem('wishlist', JSON.stringify(hotels))
            dispatch(wishListQtyAction.setWishQty(wishListQty))
            AsyncStorage.setItem('wishListQtyAction', JSON.stringify(wishListQty))
            

          }else{
            let isWishListId = null
            for(let i=0; i<wishListData.length; i++){
              wishListQty += wishListData[i].qty
              if(wishListData[i]._id ==hotel._id){
                  isWishListId =hotel._id
                  wishListData[i].qty = qty+1
              }
            }
            console.log("Is ID null...?", isWishListId)
            if(isWishListId == null){
              wishListData.push(hotel)
            }
    
            AsyncStorage.setItem('wishlist', JSON.stringify(wishListData))
            dispatch(wishlistAction.addToWishList(wishListData))
            dispatch(wishListQtyAction.setWishQty(wishListQty))
            AsyncStorage.setItem('wishListQtyAction', JSON.stringify(wishListQty))
            
    
          }
          setIsInWishlist(true)
        }).catch((e)=>{
          console.log("Error",e)
        })
      }
    }
  
    return(
        
        
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
            <HeaderComponent navigation={navigation} iconName='back' title='Hotel Details'/>
            
            <View style={{flex:1}}>
              {hotel.detailImg.map((item,index)=>{  
                  return(
                      <TouchableOpacity key={index}><Image style={{width:'100%',height:width/2}} source={item.img1}/>
                      </TouchableOpacity>
                  )
              })}
             
                <View style={{justifyContent:'space-evenly'}}>
                    
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:5,marginTop:15,alignItems:'center',justifyContent:'center',color:colors.blue}}>{hotel.hotelName}</Text>
              
                <TouchableOpacity onPress={() => addToWishList(hotel)}>
               {isInWishlist ? <Image style={{width:30,height:30,marginTop:10,tintColor:'#FF2600',marginLeft:10}} source={require('../../assets/icons/redheart.png')} /> : 
           
                <Image style={{width:30,height:30,marginTop:10,tintColor:colors.blue,marginLeft:10}} source={require('../../assets/icons/heart.png')} />
  
              
              }
             
              </TouchableOpacity>
            
                </View>
                
                <View style={{flexDirection:'row',marginTop:5}}>
                    <Image style={{width:25,height:25,marginLeft:10,tintColor:colors.blue}} source={require('../../assets/icons/location.png')}/>
                
                <Text style={{fontSize:11,paddingLeft:10,color:colors.blue}}>{hotel.detailMap}</Text>
                
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../../assets/icons/phone.png')} style={{width:25,height:25,marginLeft:10,tintColor:colors.blue}}/>
                <Text style={{fontSize:13,paddingLeft:10,color:colors.blue}}>{hotel.phone}</Text>
                

                </View>
               
                 
                <TouchableOpacity onPress={()=>navigation.navigate('Map',{lat:hotel.lat,long:hotel.long})}>
                <Text style={{fontSize:15,color:'#FF2600',padding:10}}> See On Map</Text>
                </TouchableOpacity>
                
                
                
                
               
                
            
            </View>

            <View style={{flexDirection:'row'}}>
            <View style={{flex:1,marginTop:15}}>
            <Text style={{alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:'bold',marginLeft:10,color:colors.blue}}>Ratings and Reviews</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>4</Text>
                <Image soure={require('../../assets/icons/water.png')}/>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>Excellent</Text>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>{hotel.perExe}</Text>
            </View>
         

            <View style={{flexDirection:'row',marginTop:2}}>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>3</Text>
                <Image soure={require('../../assets/icons/water.png')}/>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>Good</Text>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>{hotel.perGood}</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:2}}>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>2</Text>
                <Image soure={require('../../assets/icons/water.png')}/>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>Bad</Text>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>6%</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:2}}>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>1</Text>
                <Image soure={require('../../assets/icons/water.png')}/>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>Worse</Text>
                <Text style={{marginLeft:10,fontSize:14,color:colors.blue}}>{hotel.perWorse}</Text>
            </View>
            



            </View>
            
           

            </View>

            <View style={{marginLeft:5,flex:1,marginTop:15}}>
                <Text style={{fontSize:18,fontWeight:'bold',marginLeft:10,color:colors.blue}}>Amenities</Text>
                <View style={{flexDirection:'row',marginTop:13}}>
                    <View>
                        <Image style={{width:20,height:20,marginLeft:18,tintColor:colors.blue}} source={require('../../assets/icons/reception.png')}/>
                        <Text style={{fontSize:13,color:colors.blue}}>Reception</Text>
                    </View>
                    <View>
                        <Image  style={{width:20,height:20,marginLeft:15,tintColor:colors.blue}} source={require('../../assets/icons/wifi.png')}/>
                        <Text style={{fontSize:13,marginLeft:10,color:colors.blue}}>Free Wifi</Text>
                    </View>
                    <View>
                        <Image  style={{width:20,height:20,marginLeft:20,tintColor:colors.blue}}source={require('../../assets/icons/toilet.png')}/>
                        <Text style={{fontSize:13,marginLeft:10,color:colors.blue}}>Toilteries</Text>
                    </View>
                </View>

            </View>

            

            

            <View style={{flex:1,marginLeft:10,marginTop:17}}>
                <Text style={{fontSize:19,fontWeight:'bold',color:colors.blue}}>Service Guarantee</Text>
                <View style={{flexDirection:'row',marginTop:13}}>
                    <View style={{marginLeft:5}}>
                        <Image style={{width:20,height:20,marginLeft:4,tintColor:colors.blue}} source={require('../../assets/icons/wifi.png')}/>
                        <Text style={{fontSize:10,color:colors.blue}}>Free Wifi</Text>
                        </View>
                        <View style={{marginLeft:5}}>
                        <Image style={{width:20,height:20,marginLeft:4,tintColor:colors.blue}} source={require('../../assets/icons/television.png')}/>
                        <Text style={{fontSize:10,color:colors.blue}}>Television</Text>
                        </View>
                        <View style={{marginLeft:5}}>
                        <Image style={{width:20,height:20,marginLeft:4,tintColor:colors.blue}} source={require('../../assets/icons/water.png')}/>
                        <Text style={{fontSize:10,color:colors.blue}}>Water</Text>
                        </View>
                        <View style={{marginLeft:5}}>
                        <Image style={{width:20,height:20,marginLeft:4,tintColor:colors.blue}} source={require('../../assets/icons/clean.png')}/>
                        <Text style={{fontSize:10,color:colors.blue}}>Clean Linen</Text>
                        </View>
                        <View style={{marginLeft:5}}>
                        <Image style={{width:20,height:20,marginLeft:4,tintColor:colors.blue}} source={require('../../assets/icons/washroom.png')}/>
                        <Text style={{fontSize:10,color:colors.blue}}>WashRoom</Text>
                        </View>

                        <View style={{marginLeft:5}}>
                        <Image style={{width:20,height:20,marginLeft:4,tintColor:colors.blue}} source={require('../../assets/icons/toilet.png')}/>
                        <Text style={{fontSize:10,color:colors.blue}}>Toilteries</Text>
                        </View>


                </View>
            </View>

            <View style={{flexDirection:'row',flex:1,justifyContent:'space-around',marginTop:15}}>
                {/* <TouchableOpacity>
            <View style={{marginTop:5,marginLeft:5}}>
                <Text style={{fontWeight:'bold'}}>Recommended Room Type</Text>
            </View></TouchableOpacity> */}
            <TouchableOpacity style={{backgroundColor:colors.blue,borderRadius:5,width:160}} 
            onPress={()=>navigation.navigate('BookNow',
            {hotel:hotel}
            )}>
            
                <Text style={{fontSize:16,color:'white',marginLeft:35}}>Book Now</Text>
            </TouchableOpacity>
            </View></ScrollView>
           
            



            
        </SafeAreaView >
        
    )
}
export default DetailScreen