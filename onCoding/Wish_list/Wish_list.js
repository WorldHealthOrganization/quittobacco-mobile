/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import styles from '../Wish_list/styles';
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
  Alert,
  TextInput,
  Platform,ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import axios from 'react-native-axios';
import ApiName from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-simple-toast';



import { scalable, deviceWidth, deviceHeight, itemRadius, itemRadiusHalf, blockMarginHalf, blockMargin, blockPadding, blockPaddingHalf } from '../ui/common/responsive'

import { tr } from 'date-fns/locale';

export default class Wish_list extends Component {

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
    
    priceValid: false,
    notesValid: false,
    notesValidLength: false,

    wishImage: '',
    
    wishbase64Image: '',
   
    name: '',
    price: '',
    notes: '',
    
  };
}



componentWillUnmount() {}


componentDidMount = () => {
 
  const { navigation } = this.props;

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

   
  }
};


inputValidation = async () =>  {
  const {
    name,
    price,
    notes,
    wishImage,notesValidLength, priceValid ,notesValid,nameValidLength ,nameValid
  } = this.state;

  if (wishImage.trim() == '' || wishImage.trim() == null){
    Toast.show('Please select a image');
  }else if ( name.trim() == '' || price.trim() == ''|| notes.trim() == '' ) {

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
    
    }

    if(price.trim() == ''){
      this.setState({priceValid: true})
    }
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
    if(notesValidLength || priceValid || notesValid|| nameValidLength || nameValid){
      Toast.show('Please enter the mandatory field');
    }else{
      this.addWishData();
    }
  
  }

//  if(wishImage.trim() != '' && wishImage!= null ){
//         if (name.trim() != '' && name.length >= 2) {
//           if (price.trim() != '' && price.length > 1) {
//             if (notes.trim() != '' && notes.length >= 6) {
//               this.addWishData();
//             }
//                else {
//               Toast.show('Enter Notes ');
//             }
//           } else {
//             Toast.show('Enter Price');
//           }
//         } else {
//           this.setState({nameValid: true})
//           Toast.show('Enter Name');
//         }} else {
//           Toast.show('Please select a image');
//         }
}

addWishData = async () =>{

  const {name,price,notes,wishbase64Image,token} = this.state;
  this.setState({isHidden: true});
    console.log('input ==> ' + token+' '  +name + ' ' + price + ' ' + notes );

          axios
            .post(
              ApiName.add_wishlist,
              {
               name: name,
               price: price,
               notes: notes,
               image:  'data:image/jpeg;base64, ' + wishbase64Image,
              },
              {
                headers: {
                  'Authorization': token,
                },
              },
            )
            .then((response) => {
              console.log(
                'Added WishList response ',
                 JSON.stringify(response.data),
              );

              // Toast.show(response.data.message);

              if (response.data.status == 200) {
                this.setState({isHidden: false});
                Toast.show(response.data.message)
                 this.props.navigation.goBack();
                }
              else {
                alert(response.data.message);
              }
            })
            .catch((error) => {
              this.setState({isHidden: false});
              Toast.show('There was some error. Please try again')
              console.log('reactNativeDemo axios error:', error);
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
    const {wishImage,wishbase64Image} = this.state;
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
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        // let source = response;
        console.log('filePath ==> ' + JSON.stringify(response.path));


        ImgToBase64.getBase64String(response.uri)
          .then((base64String) =>
            this.setState({
              wishbase64Image: base64String,
            }),
          )
          // eslint-disable-next-line no-undef
          .catch((err) => doSomethingWith(err));

         

        this.setState({
          wishImage: response.uri,
        });
        // alert(this.state.wishImage);
        console.log('wishImage ==> ' + JSON.stringify(wishImage)+ ' -- ' +wishbase64Image);
      }
    });
  };

    render () {
const {isHidden,nameValid,priceValid,notesValid,nameValidLength,notesValidLength} = this.state
        return (
            <View style={styles.container}>
            <View style={styles.view}>
            <View style={styles.view2}>
            <View style={{flexDirection: 'row', width: '100%', marginTop: responsiveHeight(2),
              }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
     <Image style={styles.arrow} source={require('../../images/back_arrow.png')} />
     </TouchableOpacity>
           <Text style={styles.text_prg}>Wish List</Text>
           {/* <Image style={styles.share_img2} source={require('../../images/share.png')}/> */}
       </View>

       <View style={{flex: 1, marginTop: responsiveHeight(35)}}>
         {this.state.wishImage != ''  ?


       <View style={styles.square}>
                <TouchableOpacity style={styles.square2} onPress={this.chooseFile.bind(this)}>

             <Image  source={{ uri: this.state.wishImage, cache: 'force-cache' }} style={styles.img} />
             </TouchableOpacity>
       </View>

       :

       <View style={styles.square}>

       <TouchableOpacity style={styles.fab} onPress={this.chooseFile.bind(this)}>
            <Text style={styles.text_fab}>+</Text>
          </TouchableOpacity>
          <Text style={styles.text}>TAP TO ADD IMAGE</Text>
       </View>

    }

       </View>

                </View>
            <View style={styles.view1}>
        <TextInput style={styles.text2}
            placeholder="Name"
            placeholderTextColor="#B6C0CB"
            autoCorrect={false}
            returnKeyType="next"
            underlineColorAndroid="#B6C0CB"
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
            onSubmitEditing={()=>this.price.focus()}
          />
{nameValid && <Text style={{color: 'red',textAlign: 'left',
  
    fontFamily: 'SF-Medium',
    fontSize: scalable(9)}}>Please Enter the name</Text>}
     {nameValidLength && <Text style={{color: 'red',textAlign: 'left',
  
  fontFamily: 'SF-Medium',
  fontSize: scalable(9),}}>Please Enter atleast 3 characters</Text>}

            <TextInput style={styles.text2}
            ref={(input)=>this.price = input}
            placeholder="Price"
            keyboardType="numeric"
            placeholderTextColor="#B6C0CB"
            autoCorrect={false}
            returnKeyType="next"
            underlineColorAndroid="#B6C0CB"
            onChangeText={(price) =>
              {  this.setState({price})
              if(price.trim() != ''){
               
                  this.setState({priceValid: false})
               
              }else{
              
                this.setState({ priceValid: true })
             
              }
            
            }
            } value={this.state.price}
            onSubmitEditing={()=>this.notes.focus()}
          />
          {priceValid && <Text style={{color: 'red',textAlign: 'left',
  
  fontFamily: 'SF-Medium',
  fontSize: scalable(9),}}>Please Enter the price</Text>}
            <TextInput style={styles.text2}
            ref={(input)=>this.notes = input}
            placeholder="Notes"
            placeholderTextColor="#B6C0CB"
            autoCorrect={false}
            returnKeyType="done"
            underlineColorAndroid="#B6C0CB"
            onChangeText={(notes) =>
              {
                this.setState({ notes})
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
              
              }}
            
            } value={this.state.notes}
          />
           {notesValid && <Text style={{color: 'red',textAlign: 'left',
  
  fontFamily: 'SF-Medium',
  fontSize: scalable(9),}}>Please Enter the notes</Text>}
  {notesValidLength && <Text style={{color: 'red',textAlign: 'left',

fontFamily: 'SF-Medium',
fontSize: scalable(9),}}>Please Enter atleast 6 characters</Text>}
        </View>
       
        {/* <View style={{flex:0.5,justifyContent: 'center'}}>
        <Image  source={
                      this.state.wishImage != ''
                        ? {uri: this.state.wishImage}
                        : require('../../images/ITU_Logo.png')
                    } style={styles.img} />
        </View> */}
        <View style={{flex:0.5}}>
        <TouchableOpacity
            style={[styles.buttonContainer, styles.confirmbutton]}
            onPress={() => this.inputValidation()}>
            <Text style={styles.confirmtext}>Save</Text>
          </TouchableOpacity>
        </View>
                </View>
               
                {isHidden ? (
          <View style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignContent: 'center',
              backgroundColor:'transparent'
            
          }}>
            <ActivityIndicator
              size={40}
              color="#0072bb"
              animating={true}
              backgroundColor={'transparent'}
            />
          </View>
        ) : null}
                </View>
        );
    }

}
