import React,{useState} from 'react'
import {SafeAreaView,View,Text,TouchableOpacity,TextInput,StyleSheet,Dimensions, Platform,ScrollView,Image,ToastAndroid,ImageBackground,StatusBar} from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import {Picker} from '@react-native-picker/picker'


import DateTimePicker from '@react-native-community/datetimepicker'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import bookingAction from '../store/actions/booking'
import qtyAction from '../store/actions/qty'
import colors from '../constants/colors'
import BottomTabComponent from '../components/BottomTabComponent'
import qty from '../store/actions/qty'



const width=Dimensions.get('screen').width




const BookNowScreen=({navigation,route})=>{
     const {hotel}=route.params
     console.log("Data",route)

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [emailValidError,setEmailValidError]=useState('')
    const [phone,setPhone]=useState('')
    const dispatch=useDispatch()

    const [room,setRoom]=useState(1);
    const [guest,setGuest]=useState(1);
    const [child,setChild]=useState(0)

    const [date,setDate]=useState(new Date());        //check in
   
    const [date1,setDate1]=useState(new Date());      //check out
  
    const [mode,setMode]=useState('date');
    const [mode1,setMode1]=useState('date');
   
    const [show,setShow]=useState(false)
    const [show1,setShow1]=useState(false)
   
    const [text,setText]=useState('');
    const [text1,setText1]=useState('');

    const [isFocusedName,setIsFocusedName]=useState(false);
    const [isFocusedEmail,setIsFocusedEmail]=useState(false);
    const [isFocusedPhone,setIsFocusedPhone]=useState(false);
    const [isFocusedDate,setIsInFocusedDate]=useState(false);
    const [isFocusedDate1,setIsInFocusedDate1]=useState(false)


   const onChangeCheckin=(event,selectedDate)=>{
       setShow(false)
       if(selectedDate){
           const currentDate=selectedDate || date;
           setShow(Platform.OS ==='ios');
           setDate(currentDate);
           let tempDate=new Date(currentDate);
           let fDate=tempDate.getDate()+'/'+ (tempDate.getMonth()+1) + '/'+tempDate.getFullYear();
           setText(fDate)
       }
       else{
           setText('')
           setIsInFocusedDate(false)
       }
   }

 

    const onChange1=(event,selectedDate1)=>{
        setShow1(false)
        if (selectedDate1){
        const currentDate1=selectedDate1 || date1;
        setShow1(Platform.OS === 'ios');
        setDate1(currentDate1);

        let tempDate=new Date(currentDate1);
        let OutDate=tempDate.getDate()+'/'+ (tempDate.getMonth()+1) + '/'+tempDate.getFullYear();
      
    
        setText1(OutDate)
    }else{
        setIsInFocusedDate1(false)
            setText1('')
    }
    }

    


    const showMode=(currentMode)=>{
        setShow(true);
        
        setMode(currentMode);
        
    }
    const showMode1=(currentMode1)=>{
        setShow1(true);
        
        setMode1(currentMode1);
        
    }
    
    
    
    const saveToBooking = (hotel) => {
       
        hotel.name=name
  
        hotel.text=text             //check in
        hotel.text1=text1                //check out
        hotel.room=room
        hotel.guest=guest
        hotel.child=child
        hotel.qty = qty
        hotel.qty=1
        hotel.filNum=1
        AsyncStorage.getItem('hotel').then((res) => {
            console.log("Hotel Data form Async...", res)
            let hotelBooking = JSON.parse(res)
            let hotels = []
            if (hotelBooking == null) { 
               hotels.push(hotel)
                AsyncStorage.setItem('hotel', JSON.stringify(hotels))
                dispatch(bookingAction.addToBooking(hotels))
                AsyncStorage.setItem('bookingQty', JSON.stringify(1))
                dispatch(qtyAction.setTotalQty(1))

              
            } else {
                // let isInBooking = null
                let totQty=hotel.qty
            

           
                for (let i = 0; i < hotelBooking.length; i++) {
                 
                   
                    totQty+=hotelBooking[i].qty
                }
                
                    hotelBooking.unshift(hotel)

                    for(i=0;i<hotelBooking.length ;i++){
                        // hotelBooking[i].filNum+=1
                        hotel.filNum +=hotelBooking[i].filNum
                    }
                    console.log('Fil Num before adding',hotel.filNum)
                

                AsyncStorage.setItem('hotel', JSON.stringify(hotelBooking))
                dispatch(bookingAction.addToBooking(hotelBooking))
                AsyncStorage.setItem('bookingQty', JSON.stringify(totQty))
                dispatch(qtyAction.setTotalQty(totQty))

            }

        }).catch((e)=>{
            console.log('Error is',e)
        })
       
     
       
        setRoom(1); 
        setGuest(1);

        setChild(0);
        setText('');
        setText1('');
        setName('');
        setPhone('');
        setEmail('');
        
    }

    const checkValue=()=>{
       
        if(name =='' || email ==''||'' && phone =='' || text=='' || text1=='' || emailValidError =='Enter valid email address' ){
            showUnSuccessToast()   
           
        }else{
            saveToBooking(hotel)  
            showSuccessToast()
          

        }
    }
    
    const showSuccessToast=()=>{
        ToastAndroid.showWithGravityAndOffset(
            "Your Booking is confirmed",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        )
    }

    const showUnSuccessToast=()=>{
        ToastAndroid.showWithGravityAndOffset(
            "Your Booking is Not confirmed and please check your data",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        )
    }

const handleValidEmail=val=>{
    let reg= /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

    if (val.length===0){
        setEmailValidError('Email address must be enter');
        
    }else if (reg.test(val)===false){
        setEmailValidError('Enter valid email address')
    }else if(reg.test(val)===true){
        setEmailValidError('')
    }
};
    
const showUnSuccess=()=>{
    ToastAndroid.showWithGravityAndOffset(
        "Please fill check in date first",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
    )
}


const checkoutHandle=()=>{
  if(text==''){
    setShow1(false)
    showUnSuccess()
    setIsInFocusedDate1(false)

  
  }else{
    
    setMode(date)
  }
}
// const [rooms]=useState(
//     [
//         '1 Room',
//         '2 Rooms',
//         '3 Rooms',
//         '4 Rooms',
//         '5 Rooms',
//         '6 Rooms',
//         '7 Rooms',

//     ].sort()
// )

// const [guests]=useState(
//     [
//         '1 Guest',
//         '2 Guests',
//         '3 Guests',
//         '4 Guests',
//         '5 Guests',
//         '6 Guests',
//         '7 Guests',

//     ].sort()
// )

    return(
        
    
        <SafeAreaView style={{flex:1}}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)'/>  
            <View style={{flex:0.001}}>
                 <ImageBackground  style={{width:width,height:width*2,opacity:0.5}} source={hotel.backImg}/></View>
         
            <ScrollView>
       
              <HeaderComponent navigation={navigation} iconName='back' title='Book Now'/>
             
            <View style={styles.bookText}>
               <Text style={{fontSize:20,fontWeight:'bold',color:colors.blue}}> I am booking for</Text>
            </View>
            <View style={{width:'100%'}}> 
             <Text style={{fontSize:16,color:colors.blue,marginLeft:20}}> Enter Name</Text>
            <TextInput 
            value={name}
            style={[styles.Textinput,{borderColor:isFocusedName ? '#000080' : '#FF0000'}]}
            placeholder="Name(eg.John)"
            onChangeText={text=>setName(text)}
            autoComplete={false}
            onFocus={()=>{
                setIsFocusedName(true)
            }}

            onBlur={()=>{
                setIsFocusedName(false)
                {name!=''&& setIsFocusedName(true)}
            }}
            /> 
                <Text style={{fontSize:16,color:colors.blue,marginLeft:20}}> Enter Email</Text>
                <View style={{flexDirection:'row'}}>
              <TextInput 
            value={email}
            style={[styles.Textinput,{borderColor:isFocusedEmail ? '#000080' : '#FF0000'}]}
            placeholder="Email Address(eg.johm@gamil.com)"
            autoCorrect={false}
            autoComplete={false}

            onFocus={()=>{
                setIsFocusedEmail(true)
            }}

            onBlur={()=>{
                setIsFocusedEmail(false)
                {email!=''&& setIsFocusedEmail(true)}
             

            }}
            onChangeText={text=>{setEmail(text); 
            handleValidEmail(text)}
           
        }/>
        
        {emailValidError=='Enter valid email address'?
        
        <Image style={{width:25,height:25,marginTop:15}} source={require('../../assets/icons/check.png')}/>
       
  
        :
        isFocusedEmail && emailValidError?
         
        <TouchableOpacity onPress={()=>setEmail('')}>
       
        <Image style={{width:25,height:25,marginTop:15}} source={require('../../assets/icons/cross.png')}/>
        </TouchableOpacity>
        :
        null
      
        
       }
      </View>
     
        {/* {emailValidError? */}
        <Text style={{marginLeft:20,color:'#FF0000'}}>{emailValidError}</Text>
        {/* :null} */}
        
        

           
            

<Text style={{fontSize:16,color:colors.blue,marginLeft:20}}> Enter Phone</Text>
            <TextInput
            value={phone}
            style={[styles.Textinput,{borderColor:isFocusedPhone ? '#000080' : '#FF0000'}]}
            placeholder="Phone(*require*)" 
            onChangeText={text=>setPhone(text)}
            keyboardType='phone-pad'
            autoComplete={false}
            onFocus={()=>{
                setIsFocusedPhone(true)
            }}

            onBlur={()=>{
                setIsFocusedPhone(false)
                {phone!=''&& setIsFocusedPhone(true)}
            }}/>
            </View>
         

            <View style={{alignItems:'center',justifyContent:'center',marginTop:15}}>
                <Text style={{fontSize:16,fontWeight:'bold',color:colors.blue}}>Your Stay Date</Text>
                
            </View>
            {/* <View style={{flex:1,marginTop:5}}>
            <Text style={{fontSize:16,textAlign:'center',color:colors.text}}>Please Add Check In Date</Text>
                <DatePicker
                style={{width:'90%',marginLeft:10,color:colors.text}}
                date={date}
                placeholder='Select Check In Date'
                format='DD_MM_YYYY'
                confirmBtnText='Confirm'
                cancelBtnText='Cancel'
                onDateChange={(d)=>setDate(d)}/>
            </View> */}

        
              
            
                    <View style={{flexDirection:'row',padding:10,marginLeft:5,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity  onPress={()=>{showMode('date'),setIsInFocusedDate(true)}}>
                     <Image  style={{width:30,height:30}} source={require('../../assets/icons/calendar.png')}/>
                   
                    </TouchableOpacity>

                    {
                        show&& (
                            <DateTimePicker
                            testId='dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='default'
                            onChange={onChangeCheckin}
                            minimumDate={new Date()}
                            />
                        )
                    }
                     <View>

                 <TextInput 
            value={text}
            style={[styles.Textinput,{borderColor:isFocusedDate ? '#000080' : '#FF0000'}]}
            placeholder="Check in Date"
            autoComplete={false}
            editable={false}
            selectTextOnFocus={false}         
          /></View>
           
                </View>

                <View style={{flexDirection:'row',padding:10,marginLeft:5,justifyContent:'center',alignItems:'center'}}>


             
                    <TouchableOpacity style={{flexDirection:'row',marginTop:5}} onPress={()=>{showMode1('date1'),setIsInFocusedDate1(true),checkoutHandle()}}>
                   
                    
                    <Image  style={{width:30,height:30}} source={require('../../assets/icons/calendar.png')}/>
                   
                    </TouchableOpacity>
            
                {
                        show1&& (
                            <DateTimePicker
                            testId='dateTimePicker'
                            value={date1}
                            mode1={mode1}
                            is24Hour={true}
                            display='default'
                            onChange={onChange1}
                            minimumDate={date}/>
                        )
                    }

              
                <View>
                <TextInput 
            value={text1}
            style={[styles.Textinput,{borderColor:isFocusedDate1 ? '#000080' : '#FF0000'}]}
        
            placeholder="Check out Date"    
            autoComplete={false}
            editable={false}
            selectTextOnFocus={false}     
          />
                </View>
                </View>
              
           

            {/* <View style={{marginTop:20,flex:1}}>
                <View style={{alignItems:'center',justifyContent:'center'}}> 
                <Text style={{fontSize:16,fontWeight:'bold',color:colors.blue}}>Please Select Your Room and Guests!</Text></View>

                <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:10}}>
                    <View style={styles.drop}>
                        <Picker style={{marginVertical:4}}
                        selectedValue={setRoom}
                        onValueChange={(item)=>{
                            setRoom(item)
                        }}>
                            {rooms.map((l,index)=>(
                                <Picker.Item    key={index} label={l} value={l}/>
                            ))

                            }
                        </Picker>
                    </View> */}
                   
{/* 
                    <View style={styles.drop}>
                    <Picker style={{marginVertical:4}}
                        selectedValue={setGuest}
                        onValueChange={(item)=>{    
                            setGuest(item)
                        }}>
                            {guests.map((l,index)=>(
                                <Picker.Item  key={index} label={l} value={l}/>
                            ))

                            }
                        </Picker>

                    </View>
                </View>
            </View>
 */}

 <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:10}}>
     <Text style={{fontSize:18,fontWeight:'bold',color:colors.blue}}>
     Select Rooms and Guests</Text>

     <View style={{flexDirection:'row'}}>
         <Text style={{fontSize:15,color:colors.blue}}>Rooms</Text>
         <TouchableOpacity onPress={()=>{
             if (room>1){
                 setRoom(room-1)
             }
         }}>
         <Image style={{width:20,height:20,tintColor:colors.blue,marginLeft:30}} source={require('../../assets/icons/minus.png')}/>
         </TouchableOpacity>
        <Text style={{marginLeft:5,color:colors.blue}}>{room}</Text>
        <TouchableOpacity onPress={()=>{
            setRoom(room+1)
        }}>
        <Image style={{width:20,height:20,tintColor:colors.blue,marginLeft:5}} source={require('../../assets/icons/plus.png')}/>
        </TouchableOpacity>
     </View>      

     
     <View style={{flexDirection:'row'}}>
         <Text style={{fontSize:15,color:colors.blue}}>Guests</Text>
         <TouchableOpacity onPress={()=>{
             if (guest>1){
                 setGuest(guest-1)
             }
         }}>
         <Image style={{width:20,height:20,tintColor:colors.blue,marginLeft:35}} source={require('../../assets/icons/minus.png')}/>
         </TouchableOpacity>
         <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text style={{marginLeft:5,color:colors.blue}}>{guest}</Text></View>
        <TouchableOpacity onPress={()=>{
            setGuest(guest+1)
        }}>

        <Image style={{width:20,height:20,tintColor:colors.blue,marginLeft:10}} source={require('../../assets/icons/plus.png')}/>
        </TouchableOpacity>
     </View>

     
     <View style={{flexDirection:'row'}}>
         <Text style={{fontSize:15,color:colors.blue}}>Child(ren)</Text>
         <TouchableOpacity onPress={()=>{
             if (child>0){
                 setChild(child-1)   
             }
         }}>
         <Image style={{width:20,height:20,tintColor:colors.blue,marginLeft:10}} source={require('../../assets/icons/minus.png')}/>
         </TouchableOpacity>
        <Text style={{marginLeft:5,color:colors.blue}}>{child}</Text>
        <TouchableOpacity onPress={()=>{
            setChild(child+1)
        }}>
        <Image style={{width:20,height:20,tintColor:colors.blue,marginLeft:10}} source={require('../../assets/icons/plus.png')}/>
        </TouchableOpacity>
     </View>

     </View>
     <TouchableOpacity onPress={()=>{checkValue()}}>
     <View style={{backgroundColor:colors.primaryColor,marginTop:10,width:width/2,height:40,alignItems:'center',justifyContent:'center',marginLeft:70,borderRadius:10}}>
         <Text style={{fontSize:18,marginLeft:10,color:colors.blue}}>Confirm Booking</Text>
     </View>
     </TouchableOpacity>   

            
        


             {/* Total Payment */}
            {/* <View style={{flex:1,marginTop:15}}>
                <Text style={{fontSize:20,fontWeight:'bold',marginLeft:30,color:colors.blue}}>Total Payment Amount</Text>
                <View style={{flexDirection:'row',justifyContent:'space-evenly',flex:1,}}>

                   <TouchableOpacity >
                    <View style={{borderColor:'black'}}>
                        <Text style={{fontSize:16,color:colors.blue}}>Continue as a Guest</Text>
                    </View></TouchableOpacity>
                    <TouchableOpacity>

                    <View  style={{fontSize:18,height:30}}>
                        <Text style={{fontSize:16,color:colors.blue,marginLeft:15,fontWeight:'bold'}}>Log in</Text>
                        </View>
                        </TouchableOpacity>

                </View>

            </View> */}
            
     
            </ScrollView>
            <BottomTabComponent navigation={navigation} screenName="BookNow"/>

        </SafeAreaView>
    )
}
 export default BookNowScreen

 const styles=StyleSheet.create({
     bookText:{marginVertical:5,alignItems:'center',marginTop:10,color:colors.blue

     },
     Textinput:{marginLeft:20,marginTop:10,borderRadius:5,justifyContent:'center',color:colors.blue,borderColor:colors.blue,
     textAlign:'center',height:40,borderWidth:1,marginRight:20

     },
     drop:{width:width/3,backgroundColor:colors.primaryColor}

 })