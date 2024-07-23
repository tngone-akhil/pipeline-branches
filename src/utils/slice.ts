
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { ENDPOINTS } from './sevices';

type AuthState = {
  token: any;
}

const getTokenWithExpiry = () => {

  const itemStr = localStorage.getItem('token');
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    axios.get(ENDPOINTS.REFRESH_TOKEN,item.token)
    .then((response)=>{
      if(response.data.success==true){
        setToken({AUTHKEY:response.data.token})
        return {AUTHKEY:response.data.token}
      }else{
        alert("no token")
      }
    })
  }
  return item.value;
}

const initialState: AuthState = {
  token: getTokenWithExpiry()
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<any>) => {
        state.token = action.payload;
        const now = new Date();
        const item = {
          value: action.payload,
          expiry: now.getTime() + 1000 * 60 * 60 * 7,
        };
        localStorage.setItem('token', JSON.stringify(item));
      },
      
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
})

export const { setToken, removeToken } = authSlice.actions

export default authSlice.reducer
