import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { createChatMessage, fetchChatMessages, apiGoogleSignUp } from '../../api/index.js';
import { socket } from '../../app/socket';

const initialState = {
  chatMessages: [],
  status: 'idle',
  showChat: false,
};

// Thunks for chat actions/retrieval --- WIP ---

// export const getAllPosts = createAsyncThunk(
//   'posts/fetchAll',
//   async (page) => {
//     const response = await fetchPosts(page);
//     const { data } = response
//     return data;
//   }
// );

// export const saveNewPost = createAsyncThunk(
//   'posts/savePost',
//   async ({postData, name, editor}) => {
//     const { data } = await createPost(postData, name)
//     socket.emit('addPost', {data,editor})
//     return data
//   }
// )

// export const deleteOldPost = createAsyncThunk(
//   'posts/deletePost',
//   async ({id,editor}) => {
    
//     const {data} = await deletePost(id)
//     socket.emit('deletePost', {data,editor})
//     return id
//   }
// )

export const saveNewChatMessage = createAsyncThunk(
  'posts/saveChatMessage',
  async ({message, sender, senderId}) => {
    const { data } = await createChatMessage(message, sender, senderId)
    socket.emit('addChatMessage', {data,editor:senderId})
    return data
  }
)

export const getChatMessages = createAsyncThunk(
  'posts/fetchChatMessages',
  async () => {
    const response = await fetchChatMessages();
    const { data } = response
    return data;
  }
);

// export const deleteOldComment = createAsyncThunk(
//   'posts/deleteComment',
//   async ({belongsTo, id, editor}) => {
    
//     const { data } = await deleteComment(belongsTo, id)
//     socket.emit('deleteComment', {data,editor})
//     console.log('done with everything just need to send id out owo')
//     return id
//   }
// )

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
      .addCase(saveNewChatMessage.fulfilled, (state,action) => {
      
      state.chatMessages.push(action.payload);
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {

      state.chatMessages = action?.payload.messages
      })
      // .addCase(googleSignUp.fulfilled, (state, action) => {
      //   console.log(action.payload)
      // })

      
  },
});

export const { setChatMessages, addChatMessage, toggleChat, } = chatSlice.actions;

//Selectors for state values
export const selectChatMessages = createSelector(state => state.chat.chatMessages, x => x) ;

export const selectShowChat = createSelector(state => state.chat.showChat, x => x === true)


export default chatSlice.reducer;
