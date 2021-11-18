// Imports
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
//import { query, mutation } from 'gql-query-builder'

// App Imports
//import { API_URL, API_URL1 } from '../../../../setup/config/env'
//import { MESSAGE_SHOW } from '../../../common/api/actions'
import { SET_USER, LOGOUT, LOGIN_REQUEST, LOGIN_RESPONSE, SET_BUSKER } from './types'

// Actions

// Login a user using credentials
export function login(email, password, FcmToken) {
  // alert('In action ' + FcmToken)
  return dispatch => {
    return axios.post('http://buskerrapp.dci.in/api/login', {
      email,
      password,
      FcmToken
    })
      .then((response) => {
        // console.log(response);
        return response
      }, (error) => {
        console.log(error);
      })
      .catch(error => {
        console.log(error)
      })
  }
}

// socialLogin a user using credentials
export function socialLogin(Name,
  profile_image, socialid,
  FcmToken,
  email,
  mobile) {
  // alert('In action ' + FcmToken)
  return dispatch => {
    return axios.post('http://buskerrapp.dci.in/api/sociallogin', {
      Name,
      profile_image, socialid,
      FcmToken,
      email,
      mobile
    })
      .then((response) => {
        // console.log(response);
        return response
      }, (error) => {
        console.log(error);
      })
      .catch(error => {
        console.log(error)
      })
  }
}




// Get Dashboard
export function getDashboard(token) {
  alert('JWT'+token)
  return dispatch => {
    return axios.post('http://whoapp.dci.in/api/dashboard', {
     
    },{ headers: {
      Authorization: 'Bearer '+ token //the token is a variable which holds the token
    }})
      .then((response) => {
        // console.log(response);
        return response
      }, (error) => {
        console.log(error);
      })
      .catch(error => {
        console.log(error)
      })
  }
}





export function uploadProfileImageTipper(user_id, file,token) {
 // alert(user_id+'-----'
  //+email+ '----'+mobile+'-----'+Name+'---'+profile_image)
  return dispatch => {
    return axios.post('http://buskerrapp.dci.in/api/profileEdit', file ,{
      headers: {
        Authorization: 'Bearer '+ token //the token is a variable which holds the token
      
      }
    })
      .then((response) => {
       // alert(JSON.stringify(response))
        return response
      }, (error) => {
        console.log(error);
      })
      .catch(error => {
        console.log(error)
      })
  }
}






// Log out user and remove token from local (AsyncStorage)
export function logoutAPI(user_id, token) {
  return dispatch => {
    return axios.post('http://buskerrapp.dci.in/api/logout', {
      user_id
    },{ headers: {
      Authorization: 'Bearer '+ token //the token is a variable which holds the token
    }})
      .then((response) => {
        // console.log(response);
        return response
      }, (error) => {
        console.log(error);
      })
      .catch(error => {
        console.log(error)
      })
  }
}
export function logout() {
  return dispatch => {
    unsetUserLocally()

    dispatch({
      type: LOGOUT
    })
  }
}

// Set a user after login or using local (AsyncStorage) token
export function setUser(token, user) {
 
  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`
    setUserLocally(token, user)
  } else {
    delete axios.defaults.headers.common['authorization']
  }

  return {
    type: SET_USER,
    user
  }
}

export function setBusker(BuskerId) {
  setBuskerLocally(BuskerId)
  return {
    type: SET_BUSKER,
    BuskerId
  }
}
// Set user token and info locally (AsyncStorage)
export async function setBuskerLocally( BuskerId) {
  await AsyncStorage.setItem('BuskerId', BuskerId)
 
}

// Set user token and info locally (AsyncStorage)
export async function setUserLocally(token, user) {
  // Set token
  await AsyncStorage.setItem('token', token)
  await AsyncStorage.setItem('user', JSON.stringify(user))
}

// Unset user token and info locally (AsyncStorage)
export async function unsetUserLocally() {
  // Remove token
  await AsyncStorage.removeItem('token')
  await AsyncStorage.removeItem('user')
  await AsyncStorage.removeItem('BuskerId')

  // Clear cache
  const keys = await AsyncStorage.getAllKeys()
  const cacheKeys = keys.filter(k => k.indexOf('CACHE.KEY.') !== -1)
  if (cacheKeys.length) {
    await AsyncStorage.multiRemove(cacheKeys)
  }
}


