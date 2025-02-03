// Integrate the login and account methods
import {doPut, doGet, doPost, getHeader} from './api'
import { 
    LOGIN, 
    ACCOUNT 
} from "./endpoints"; // Import the endpoints

const API_URL = process.env.REACT_APP_API_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;


export const login = (body) => {
    return doPost(`${API_URL}${API_VERSION}${LOGIN}`, body); // Pass the object as body
  };
  
  export const account = (requestData, token) => {
    return doPost(`${API_URL}${API_VERSION}${ACCOUNT}`, requestData, getHeader(token)); 
};

  
  