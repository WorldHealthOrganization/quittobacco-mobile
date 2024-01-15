/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../Plans/styles';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ImgToBase64 from 'react-native-image-base64';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,ActivityIndicator, SafeAreaView,FlatList,Keyboard,TouchableWithoutFeedback
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-simple-toast';



import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'
import { th } from 'date-fns/locale';


export default class Plans extends Component {

constructor(props) {
  super(props);
  this.state = {
    isHidden: false,
    //userInfo
    user_id: '',
    user_name: '',
    mobile_no: '',
    email_id: '',
    profile_image: '',
    fcm: '',
    token: '',

    nameValid: false,
    nameValidLength: false,
    
    notesValid: false,
    notesValidLength: false,

    planImage: '',
    
    planbase64Image: '',
   
    name: '',
    notes: '',
    use_reason: []
   
    
  };
}



componentWillUnmount() {}


componentDidMount = () => {
 

    this.getUser()
    this.permissionChk();

}

getUser = async () => {

  const user_id = await AsyncStorage.getItem('UserId');
  const user_name = await AsyncStorage.getItem('UserName');
  const mobile_no = await AsyncStorage.getItem('UserMobileNo');
  const email_id = await AsyncStorage.getItem('UserEmailId');
  const profile_image = await AsyncStorage.getItem('UserProfileImage');
  const fcm = await AsyncStorage.getItem('UserFCM');
  const token = await AsyncStorage.getItem('Login_JwtToken');

  if (token !== '') {
    this.setState({

      token: token,
    });
 this.show()
   
  }
};



show = async () => {

  let jwt_token = await AsyncStorage.getItem('Login_JwtToken');

  this.setState({ isHidden: true })
  axios
    .post(
      ApiName.userInfoshow, {},
      {
        headers: {
          'Authorization': jwt_token,
        },
      },
    )
    .then((response) => {
        
      this.setState({ isHidden: false })

      if (response.data.status == 200) {
     
        this.setState({use_reason:response.data.data.use_reasons});

      }
    })
    .catch((error) => {
      this.setState({ isHidden: false })
      Toast.show('There was some error. Please try again')
     
    });
}


inputValidation = async () =>  {
  const {
    name,
    notes,
    planImage, notesValid ,nameValidLength ,nameValid,notesValidLength
  } = this.state;

  // if (planImage.trim() == '' || planImage.trim() == null){
  //   Toast.show('Please select a image');
  // }else if ( name.trim() == '' || notes.trim() == '' ) {
    if (  notes.trim() == '' ) {
   
     
    

    if(notes.trim() != ''){
      if(notes.length > 0 ){
        this.setState({notesValid: false})
        if(notes.length >= 6 ){
          this.setState({notesValidLength: false})
        }else{
          this.setState({notesValidLength: true})
        }
      }else{
        this.setState({notesValid: true})
      }
    }else{
     
      this.setState({ notesValid: true })
    
    }
    

  }else{
    if(notesValid || notesValidLength ){
      Toast.show('Please enter the mandatory field');
    }else{
      this.addPlanData();
    }
  
  }

}



addPlanData = async () =>{

  const {name,notes,planbase64Image,token} = this.state;
  this.setState({isHidden: true});
   

          axios
            .post(
              ApiName.store_mission,
              {
              //  name: name,
               notes: notes,
              //  image:  'data:image/jpeg;base64, ' + planbase64Image,
              },
              {
                headers: {
                  'Authorization': token,
                },
              },
            )
            .then((response) => {
              this.setState({isHidden: false});

              if (response.data.status == 200) {
              
                Toast.show(response.data.message)
                 this.props.navigation.goBack();
                }
              else {
                Toast.show(response.data.message);
              }
            })
            .catch((error) => {
              this.setState({isHidden: false});
              Toast.show('There was some error. Please try again')
             
            });
        }



  permissionChk = async () => {
    request(
      Platform.select({
        android_read: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        android_write: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ios_photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
        ios_media: PERMISSIONS.IOS.MEDIA_LIBRARY,
      }),
    )
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            break;
          case RESULTS.GRANTED:
            break;
          case RESULTS.BLOCKED:
            break;
        }
      })
      .catch((error) => {
        // …
      });
  };

  chooseFile = () => {
    const {planImage,planbase64Image} = this.state;
    this.permissionChk();
    var options = {
      title: 'Select Image',
      noData: true,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
    

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
       
        ImgToBase64.getBase64String(response.uri)
          .then((base64String) =>
            this.setState({
              planbase64Image: base64String,
            }),
          )
          // eslint-disable-next-line no-undef
          .catch((err) => doSomethingWith(err));

         

        this.setState({
          planImage: response.uri,
        });
       
      }
    });
  };

  
  ListEmpty = () => {
    const { isHidden } = this.state
    if (!isHidden) {
      return (
        //View to show when list is empty
        <View style={{ flexDirection: 'column', height: blockMargin * 6, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }} >
            <Text numberOfLines={2} style={{
              color: '#555555',
              textAlign:'center',
              fontFamily: 'SFCompactDisplay-Medium',
              fontSize: scalable(14), alignItems: 'center'
            }}>No Use Reason Yet</Text>
          </View>
        </View>
      );
    } else if (isHidden) {
      return (
        //View to show when list is empty
        <View style={{ flexDirection: 'column',  height: blockMargin * 4, width: deviceWidth, justifyContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
          </View>
        </View>
      );
    }
  };


    render () {
const {isHidden,nameValid,notesValid,nameValidLength,notesValidLength} = this.state;
        return (
          <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
            <View style={styles.view}>
            
            <View style={{
            flexDirection: 'row', width: '100%', height: '12%',
            backgroundColor: '#0072BB', alignItems: 'center', justifyContent: 'center'
          }}>
            <View style={{ width: '12%', height: responsiveHeight(10), justifyContent: 'center', alignContent: 'center', alignSelf: 'center', }}>

              <TouchableOpacity style={{

                alignItems: 'center',
              }} onPress={() => this.props.navigation.goBack()}>

                <Image style={{
                  width: responsiveWidth(3),
                  height: responsiveHeight(4),

                  resizeMode: 'contain'
                }} source={require('../../images/back_arrow.png')} />

              </TouchableOpacity>

            </View>
            <View style={{ width: '76%', height: responsiveHeight(12), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontFamily: 'SFCompactDisplay-Medium',
                fontSize: scalable(18),
                justifyContent: 'center',
                textAlign: 'center',

              }}>Add Your Plan</Text>
            </View>
            <View style={{ width: '12%', height: responsiveHeight(12), alignItems: 'center', justifyContent: 'center', marginRight: blockMarginHalf }}>

              <TouchableOpacity style={{

                alignItems: 'center',
              }} onPress={() => this.shareApp({ type: 2 })}>

                <Image style={{
                  width: 0,
                  height: 0,
                  tintColor: '#0072bb',
                  resizeMode: 'contain'
                }} source={require('../../images/share.png')} />

              </TouchableOpacity>
            </View>
          </View>
           
          <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{  flexDirection:'column',marginTop: blockMargin,
        backgroundColor: '#fff',width:'90%',justifyContent:'center',alignSelf:'center'}}>
            
        



            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: blockMarginHalf * 2 }}>
                <Text style={{ fontFamily: 'SFCompactDisplay-Medium', textAlign: 'center', fontSize: scalable(15) }}>Try to avoid these situations which prompt to use tobacco till you reach your quit date</Text>
               


                <FlatList

                  data={this.state.use_reason}                  
                  showsVerticalScrollIndicator={false}

                  renderItem={({ item, index }) => (

                    <View style={{width:'100%',flexDirection:'row'}}> 
<Text style={{ fontFamily: 'SFCompactDisplay-Bold', textAlign: 'left', fontSize: scalable(15), marginTop: blockMarginHalf*2 }}>
                 *
</Text>
                            
                          <Text style={{marginLeft: blockMargin ,marginRight: blockMargin, fontFamily: 'SFCompactDisplay-Regular', textAlign: 'left', fontSize: scalable(13), marginTop: blockMarginHalf*2 }}>
                 {item+''}
</Text>



                    </View>
                  )}
                  enableEmptySections={true}
                  ListEmptyComponent={this.ListEmpty}

                  keyExtractor={(item, index) => index.toString()}
                />
              
              {isHidden ? (
          <View style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
            <ActivityIndicator
              size={40}
              color="#0072BB"
              animating={true}
              backgroundColor={'transparent'}
              style={{marginTop:80}}
            />
          </View>
        ) : null}

              </View>


        {/* <TextInput style={styles.text2}
            placeholder="Name"
            placeholderTextColor="#B6C0CB"
            autoCorrect={false}
            returnKeyType="next"
            underlineColorAndroid="transparent"
            onChangeText={(name) => {
              this.setState({name})
              if(name.trim() != ''){
                if(name.length > 0 ){
                  this.setState({nameValid: false})
                  if(name.length >= 3 ){
                    this.setState({nameValidLength: false})
                  }else{
                    this.setState({nameValidLength: true})
                  }
                }else{
                  this.setState({nameValid: true})
                }
              }else{
               
                this.setState({ nameValid: true })
                this.setState({nameValidLength: false})
              
              }
            }} value={this.state.name}
            onSubmitEditing={()=>this.notes.focus()}
          /> */}
           
          {/* <View style={{backgroundColor:'#bbbbbb', width:'100%', height:1, marginTop:-5}}></View>
{nameValid && <Text style={{color: 'red',textAlign: 'left',
  
    fontFamily: 'SFCompactDisplay-Medium',
    fontSize: scalable(9)}}>Please Enter the name</Text>}
     {nameValidLength && <Text style={{color: 'red',textAlign: 'left',
  
  fontFamily: 'SFCompactDisplay-Medium',
  fontSize: scalable(9),}}>Please Enter atleast 3 characters</Text>} */}

<View style = { {
  width: '90%',
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),} }>
          <TextInput 
         maxLength={800}
         
         ref={(input)=>this.notes = input}
         placeholder="Notes"
         placeholderTextColor="#B6C0CB"
         multiline={true}
         onChangeText={(notes) =>
          {  this.setState({notes})
          if(notes.trim() != ''){
            if(notes.length > 0 ){
              this.setState({notesValid: false})
              if(notes.length >= 6 ){
                this.setState({notesValidLength: false})
              }else{
                this.setState({notesValidLength: true})
              }
            }else{
              this.setState({notesValid: true})
            }
          }else{
           
            this.setState({ notesValid: true })
            this.setState({notesValidLength: false})
          
          }
        
        }
        }
        value={this.state.notes}
          placeholderTextColor="#B6C0CB" 
          underlineColorAndroid = "transparent" 
          returnKeyType="done" 
          style = { {  fontFamily: 'SFCompactDisplay-Medium',
          fontSize: responsiveFontSize(2),
          
           fontSize:16} }/>
          <View style={{   borderBottomWidth: responsiveWidth(0.45),
    marginTop: responsiveHeight(0.5),
    borderBottomColor: '#B6C0CB',
    width: '100%',
    marginLeft:responsiveWidth(0),}} />
        
        {notesValid && <Text style={{color: 'red',textAlign: 'left',
  marginTop:blockMarginHalf,
  fontFamily: 'SFCompactDisplay-Medium',
  fontSize: scalable(12),}}>Please Enter Some Notes</Text>}
             {notesValidLength && <Text style={{color: 'red',textAlign: 'left',
  marginTop:blockMarginHalf,
  fontFamily: 'SFCompactDisplay-Medium',
  fontSize: scalable(12),}}>Please Enter atleast 6 characters</Text>}

        </View>

           

<View style={{justifyContent:'center',alignSelf:'center', marginBottom:30}}>
        <TouchableOpacity
            style={[styles.buttonContainer, styles.confirmbutton]}
            onPress={() => this.inputValidation()}>
            <Text style={styles.confirmtext}>Add Plan</Text>
          </TouchableOpacity>
        </View>

        </View>
       </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      
      
                </View>
               
            
                </View>
        </SafeAreaView>
        );
    }

}
