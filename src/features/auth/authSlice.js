import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { apiSignUp, apiSignIn } from '../../api/index.js';

const initialState = {
  profile: {},
  status: 'idle',
};

// Thunks for signin/signup

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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, action) => {//THIS must have a userId... I think?
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      state.profile = action?.payload
    },
    authLogout: (state) => {
        localStorage.removeItem('profile')
      state.profile = {}
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

      
  },
});

export const { authLogout, auth, } = authSlice.actions;

//Selectors for state values
export const selectProfile = createSelector(state => state.auth.profile, profile => profile) ;

export const selectProfileExists = createSelector(state => state.auth.profile, profile => profile.token ? true : false)

export const selectCurrentPost = createSelector(state => state.posts.posts, state => state.posts.currentPostId, (posts,currentPost) => currentPost === '' ? false : posts.find(post => post._id === currentPost))


export default authSlice.reducer;
