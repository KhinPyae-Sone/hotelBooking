import React,{useState,useEffect} from 'react'
import {View,Text,SafeAreaView,TouchableOpacity,Image,StyleSheet,Modal,Dimensions} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import HeaderComponent from '../components/HeaderComponent'
import colors from '../constants/colors'
import BottomTabComponent from '../components/BottomTabComponent'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../../firebase'

import countSignAction from '../store/actions/count'
import nameAction from '../store/actions/auth'
import { useDispatch,useSelector } from 'react-redux'
const width=Dimensions.get('screen').width


const ProfileScreen=({navigation,route})=>{
    const [showDialog,setShowDialog]=useState(false)
    const userName = useSelector(state => state.USERINFO)
    const dispatch=useDispatch()
    useEffect(() => {

        const getUserInfo = async() => {

        const getUserNameFromAsync = await AsyncStorage.getItem('userInfo')

        const userInfo = JSON.parse(getUserNameFromAsync)


        if(userInfo == null){

            AsyncStorage.setItem('userInfo', JSON.stringify([]))
            dispatch(nameAction.addToAuth([]))

        }else{

            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            dispatch(nameAction.addToAuth(userInfo))


        }

        }

        // const getUserEmail = async() => {

        // const userEmailFromAsync = await AsyncStorage.getItem('email')

        // const userEmailData = JSON.parse(userEmailFromAsync)
        
        // if(userEmailData == null){

        //     AsyncStorage.setItem('email', JSON.stringify([]))
        //     dispatch(emailAction.saveToEmail([]))


        // }else{

        //     AsyncStorage.setItem('email', JSON.stringify(userEmailData))
        //     dispatch(emailAction.saveToEmail(userEmailData))

        // }

        // }


        // getUserEmail()
        getUserInfo()

    },[])


    const handleSignOut=()=>{
        auth
        .signOut()
        .then(()=>{

            navigation.navigate("LogIn")
        })
        .catch(error=>alert(error.message))
    }
    // const [currenct,setCurrency]=useState('')
    // const [currImg,setCurrImg]=useState('../../asserts/icons/user.png')

    // const [nationality,setNationality]=useState('')

    // const [language,setLanguage]=useState('')

    // const [currencys]=useState(
    //     [
    //         'United State Dollar(USD)',
    //         'Euro(EUR)',
    //         'Australian Dollar(AUD)',
    //         'Swiss Franc(CHF)',
    //         'Myanmar Kyat(MMK)',
    //         'Indian Rupee(INR)',
    //         'Singapore Dollar(SGD)',
    //         'South Korea Won(KRW)',
    //         'Japanese Yen (JPY)'

    //     ]
    // )

    // const [nationalities]=useState([
    //     'United States(US)',
    //     'United Kingdom(UK)',
    //     'Myanmar',
    //     'Japan',
    //     'South Korea',
    //     'India',
    //     'Switzerland',
    //     'Australia',
    //     'Singapore',
    //     'Vietnam',
    //     'Thailand',
    //     'Philipines',
    //     'Spain'
    // ])



    // const [languages]=useState([
    //     'English',
    //     'Myanmar',
    //     'Japan',
    //     'Korea',
    //     'India',
    //     'Vietnam',
    //     'Thailand',
    //     'Philippines',
    //     'Spain',
    //     'Portugal'
    // ].sort())



    return(
        <SafeAreaView style={{flex:1}}>
            <HeaderComponent navigation={navigation} title='Profile' iconName='back'/>
            <ScrollView>
            <View style={styles.container}>
                <View style={{backgroundColor:'#00BFFF',borderRadius:40}}>
                <Image  source={require('../../assets/icons/customer.png')}/></View>

                <Text style={{fontSize:20,fontWeight:'bold',color:colors.blue,marginTop:20}}>{userName}</Text>
                <Text style={{fontSize:16,color:colors.blue}}>Genius(level 1)</Text>
            </View>

            <View >
                <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={require('../../assets/icons/manageaccount.png')}/>
                   <Text style={styles.text}>
                        Manage Your Account
                    </Text> 
                </View>

              
                <View style={styles.iconContainer}>
                   
                    <Image style={styles.icon} source={require('../../assets/icons/reviews.png')}/>
                    <TouchableOpacity onPress={()=>navigation.navigate('Review')}>
                    <Text style={styles.text}>
                       Reviews
                    </Text>
                    </TouchableOpacity>
                </View>
               

                <View style={styles.iconContainer}>
                   
                    <Image style={styles.icon} source={require('../../assets/icons/currency.png')}/>
                    <Text style={styles.text}>
                        Currency
                    </Text>
{/*                 
                        <View style={styles.picker}>
                    <Picker 
                        selectedValue={setCurrency}
                        onValueChange={(item)=>{
                            setCurrency(item)
                        }}>
                            {currencys.map((l,index)=>(
                                <Picker.Item   key={index} label={l} value={l}/>
                            ))

                            }
                        </Picker></View> */}
                    

                </View>
            

                <View style={styles.iconContainer}>
                   
                   <Image style={styles.icon} source={require('../../assets/icons/nationality.png')}/>
                   <Text style={styles.text}>
                      Nationality
                   </Text>
               
                       {/* <View style={styles.picker}>
                   <Picker 
                       selectedValue={setNationality}
                       onValueChange={(item)=>{
                           setNationality(item)
                       }}>
                           {nationalities.map((l,index)=>(
                               <Picker.Item   key={index} label={l} value={l}/>
                           ))

                           }
                       </Picker></View>
                    */}

               </View>
          
                <View style={styles.iconContainer}>
                   
                    <Image style={styles.icon} source={require('../../assets/icons/language.png')}/>
                    <Text style={styles.text}>
                        Language
                    </Text>
                
                        {/* <View style={styles.picker}>
                    <Picker 
                        selectedValue={setLanguage}
                        onValueChange={(item)=>{
                            setLanguage(item)
                        }}> 
                            {languages.map((l,index)=>(
                                <Picker.Item   key={index} label={l} value={l}/>
                            ))

                            }
                        </Picker></View> */}
                    

                </View>
            </View>

            <View style={{width:'90%',height:1,backgroundColor:colors.blue,marginLeft:10,marginTop:10}}/>


            <View style={{flex:1,marginTop:10}}>
                <TouchableOpacity onPress={()=>navigation.navigate('WishList')}>
                <View style={styles.iconContainer}>
               <Image style={styles.icon} source={require('../../assets/icons/heart.png')}/>
               <Text style={styles.text}>My Wishlist</Text></View></TouchableOpacity>

               <TouchableOpacity onPress={()=>navigation.navigate('BookingList')}>
                <View style={styles.iconContainer}>
               <Image style={styles.icon} source={require('../../assets/icons/bookinglist.png')}/>
               <Text style={styles.text}>Booking list</Text></View></TouchableOpacity>

               <View style={{width:'90%',height:1,backgroundColor:colors.blue,marginLeft:10,marginTop:10}}/>


               <View style={{flex:1,marginTop:10}}>
                   <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10,color:colors.blue}}>Help and Spport</Text>
                   <TouchableOpacity onPress={()=>navigation.navigate('Customer')}>

                   <View style={styles.iconContainer}>
                       <Image style={styles.icon} source={require('../../assets/icons/customer.png')}/>
                       <Text style={styles.text}>Customer Service</Text>
                   </View></TouchableOpacity>

                   
                   <View style={styles.iconContainer}>
                       <Image style={styles.icon} source={require('../../assets/icons/safe.png')}/>
                       <Text style={styles.text}>Safety Resource Centre</Text>
                   </View>
                    
                   <View style={styles.iconContainer}>
                       <Image style={styles.icon} source={require('../../assets/icons/contacts.png')}/>
                       <Text style={styles.text}>Contact Us</Text>
                   </View>


               </View>

               <View style={{width:'90%',height:1,backgroundColor:colors.blue,marginLeft:10,marginTop:10}}/>





               <TouchableOpacity onPress={()=>{navigation.closeDrawer()
            setShowDialog(true)}} >
                <View style={styles.iconContainer}>
               <Image style={styles.icon} source={require('../../assets/icons/logout.png')}/>
               <Text style={styles.text}>logout</Text></View></TouchableOpacity>
               </View>
               <Modal animationType="none" transparent={true} visible={showDialog}>
                <View style={{justifyContent:'center',alignItems:'center',padding:20,flex:1,backgroundColor:'rgba(0,0,0,0.8)'}}>
                    <View style={{width:'95%',alignItems:'center',justifyContent:'center',borderRadius:10,backgroundColor:colors.white}}>
                        <Text style={{fontSize:20,color:colors.blue,textAlign:'center'}}>Please Come Back Soon</Text>
                        <Text style={{fontSize:20,color:colors.blue,textAlign:'center'}}>Are You Sure Want To Exit?</Text>
                   
                    <View style={{marginTop:20,flexDirection:'row',backgroundColor:colors.white}}>

                   
                        <View style={{backgroundColor:colors.green,width:70,borderRadius:5,alignItems:'center',justifyContent:'center',height:50}}>
                            <TouchableOpacity onPress={handleSignOut}>
                        <Text style={{color:colors.white,fontSize:14}}>Yes</Text>
                        </TouchableOpacity></View>
                       
                        <View style={{backgroundColor:colors.green,width:70,borderRadius:5,alignItems:'center',justifyContent:'center',height:50}}>
                        <TouchableOpacity onPress={()=>setShowDialog(false)}>
                        <Text style={{color:colors.white,fontSize:14}}>Cancel</Text>
                        </TouchableOpacity></View>
                    </View> 
                </View></View>

            </Modal>
            </ScrollView>
           

           
            <BottomTabComponent navigation={navigation} screenName="Profile"/>
        </SafeAreaView>
    )}
    export default ProfileScreen
    const styles=StyleSheet.create(
        {
            icon:{width:25,height:25,tintColor:colors.blue},
            text:{fontSize:15,paddingLeft:10,color:colors.blue},
            iconContainer:{flexDirection:'row',borderColor:colors.blue,marginTop:15,marginLeft:10},
            container:{backgroundColor:'#87CEFA',justifyContent:'center',alignItems:'center',height:width/2},
            picker:{width:width/2,height:40,backgroundColor:colors.primaryColor,marginLeft:20}
           
            
        }
      )