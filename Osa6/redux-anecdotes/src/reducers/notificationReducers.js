import { createSlice } from "@reduxjs/toolkit"
const initialState = null
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        notificationVote: {
            reducer: (state, action) => {                
                return action.payload
            },
            prepare: (text) => {
                if (text === null){
                    return {payload: null}
                }
                return {payload: `you voted '${text.content}'`}
            }
        },
        notificationCreate: {
            reducer: (state, action) => {
                return action.payload
            },
            prepare: (text)=> {
                if (text === null){
                    return {payload: null}
                }
                return {payload: `you created '${text.content}'`}
            }
        }
    }



})

export const { notificationVote, notificationCreate } = notificationSlice.actions
export default notificationSlice.reducer
