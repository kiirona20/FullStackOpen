import { createSlice } from "@reduxjs/toolkit"

const initialState = null
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        notification: {
            reducer: (state, action) => {
                return action.payload
            },
            prepare: (text) => {
                if (text === null){
                    return {payload: null}
                }
                return {payload: text}

            }
        }
    }



})

export const { notification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return dispatch => {
      dispatch(notification(content))
      setTimeout(()=> {
        dispatch(notification(null))
      }, time*1000)
    }
  }


export default notificationSlice.reducer
