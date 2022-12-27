import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import authReducer from '../features/auth/authSlice'
import chatReducer from '../features/chat/chatSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    chat: chatReducer,
  },
});
