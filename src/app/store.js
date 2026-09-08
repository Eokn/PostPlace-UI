import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../features/auth/authSlice';
import {chatSlice} from '../features/chat/chatSlice';
import {postsSlice} from '../features/posts/postsSlice';

const rootReducer = combineSlices( authSlice, chatSlice, postsSlice )

// export const rootState = rootReducer()

export const store = configureStore({
    reducer: rootReducer
})

export const AppDispatch = store["dispatch"]
export default store;