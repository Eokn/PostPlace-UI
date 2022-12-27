import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { apiSignUp, apiSignIn, apiGoogleSignUp } from '../../api/index.js';

const initialState = {
  chatMessages: [],
  status: 'idle',
  showChat: false,
};

// Thunks for chat actions/retrieval --- WIP ---

export const signUpAuth = createAsyncThunk(
  'auth/signNewUp',
  async ({formData,history}) => {
    const { data } = await apiSignUp(formData)
    history.goBack();
    return data
  }
)

export const signInAuth = createAsyncThunk(
  'auth/signOldIn',
  async({formData,history}) => {
    const { data } = await apiSignIn(formData)
    history.goBack();
    return data
  }
)
export const googleSignUp = createAsyncThunk(
  'auth/googleSignUp',
  async({name, email}) => {
    const { data } = await apiGoogleSignUp({name,email})
    return data
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
        state.showChat = !state.showChat;
    },
    setChatMessages: (state, action) => {
      state.chatMessages = action.payload;
    },
    addChatMessage: (state, action) => {
        state.chatMessages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAuth.fulfilled, (state,action) => {
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      state.profile = action?.payload
      })
      .addCase(signInAuth.fulfilled, (state, action) => {
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      state.profile = action?.payload
      })
      .addCase(googleSignUp.fulfilled, (state, action) => {
        console.log(action.payload)
      })

      
  },
});

export const { setChatMessages, addChatMessage, toggleChat, } = chatSlice.actions;

//Selectors for state values
export const selectChatMessages = createSelector(state => state.chat.chatMessages, x => x) ;

export const selectShowChat = createSelector(state => state.chat.showChat, x => x === true)


export default chatSlice.reducer;
