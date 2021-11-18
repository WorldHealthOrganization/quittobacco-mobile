// Imports
import axios from 'axios'
//import { query, mutation } from 'gql-query-builder'

// App Imports
//import { API_URL } from '../../../../setup/config/env'

// Actions

// New Customer Registration
export function signupCustomer({ Name, lastName, email, country_code, mobile, password, FcmToken, latitude, longitude, location }) {
  return dispatch => {
    return axios.post('http://buskerrapp.dci.in/api/register', {
      Name,
      lastName,
      email,
      country_code,
      mobile,
      password,
      FcmToken,
      latitude,
      longitude,
      location
    })
  
      .then((response) => {
        return response
      }, (error) => {
        console.log(error);
      })
      .catch(error => {
        console.log(error)
      })
  }
}




