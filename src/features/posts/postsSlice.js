import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchPosts, createPost, updatePost, deletePost, likePost, fetchPostsBySearch, fetchPostReco, fetchUserInfo, createComment, likeComment, deleteComment, deleteContent, deleteUserAccount } from '../../api';
import { socket } from '../../app/socket';
import { authLogout } from '../auth/authSlice';

const initialState = {
  onPostDetails:'',
  currentPostId:'',
  posts:[],
  comments:[],
  userInfo:[],
  currentPage:1,
  numberOfPages:1,
  status: 'idle',
};

//AsyncThunks - crud operations on posts / comments.

export const getAllPosts = createAsyncThunk(
  'posts/fetchAll',
  async (page) => {
    const response = await fetchPosts(page);
    const { data } = response
    return data;
  }
);

export const getSingleUserInfo = createAsyncThunk(
  'posts/fetchSingleUser',
  async (id) => {
    const response = await fetchUserInfo(id);
    const { data } = response
    return data;
  }
);

export const getSinglePostReco = createAsyncThunk(
  'posts/fetchSinglePost',
  async (id) => {
    const response = await fetchPostReco(id);
    const { data } = response
    return data;
  }
);

export const getPostsWithSearch = createAsyncThunk(
  'posts/fetchQuery',
  async (searchQuery) => {
    const response = await fetchPostsBySearch(searchQuery);
    const { data } = response
    return data;
  }
);

export const saveNewPost = createAsyncThunk(
  'posts/savePost',
  async ({postData, name, editor}) => {
    const { data } = await createPost(postData, name)
    socket.emit('addPost', {data,editor})
    return data
  }
)

export const updateOldPost = createAsyncThunk(
  'posts/updatePost',
  async ({id,postData,editor}) => {
    const { data } = await updatePost(id,postData)
    socket.emit('updatePost', {data,editor})
    return data
  }
)


export const deleteOldPost = createAsyncThunk(
  'posts/deletePost',
  async ({id,editor}) => {
    
    const {data} = await deletePost(id)
    socket.emit('deletePost', {data,editor})
    return id
  }
)

export const likeOldPost = createAsyncThunk(
  'posts/likePost',
  async ({id,editor}) => {
    
    const { data } = await likePost(id)
    socket.emit('updatePost', {data,editor})
    return data
  }
)

export const saveNewComment = createAsyncThunk(
  'posts/saveComment',
  async ({message, belongsTo, name, creator}) => {
    const { data } = await createComment(message, belongsTo, name, creator)
    socket.emit('addComment', {data,editor:creator})
    return data
  }
)

export const likeOldComment = createAsyncThunk(
  'posts/likeComment',
  async ({belongsTo, id, editor}) => {
    
    const { data } = await likeComment(belongsTo, id)
    socket.emit('updateComment', {data,editor})
    return data
  }
)

export const deleteOldComment = createAsyncThunk(
  'posts/deleteComment',
  async ({belongsTo, id, editor}) => {
    
    const { data } = await deleteComment(belongsTo, id)
    socket.emit('deleteComment', {data,editor})
    console.log('done with everything just need to send id out owo')
    return id
  }
)

export const deleteAllContent = createAsyncThunk(
  'posts/deleteAllContent',
  async (items) => {
    const {data} = await deleteContent(items)
    return data
  }
)
export const deleteAccount = createAsyncThunk(
  'posts/deleteAccount',
  async (items, { dispatch }) => {
    const {data} = await deleteUserAccount(items)
    dispatch(authLogout({}))
    return data
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    editPost: (state, action) => {
      state.currentPostId = action.payload;
    },
    updateOnPostDetails: (state, action) => {
      state.onPostDetails = action.payload
    },
    socketUpdatePost: (state, action) => {
      if(state.posts.find(x => x._id === action.payload._id) !== undefined) {
        state.posts = state.posts.map(x => x._id === action.payload._id ? action.payload : x )
      }
    },
    socketDeletePost: (state, action) => {
      if(!state.onPostDetails || (state.onPostDetails && action.payload._id !== state.posts[0]._id)){
        state.posts = state.posts.filter(x => x._id !== action.payload._id)
        state.userInfo = state.userInfo.filter(x => x._id !== action.payload._id)
      }
    },
    socketAddPost: (state, action) => {
      
        if(state.currentPage === 1 && state.posts.length > 5){
          if(state.posts.length === 8){
            state.posts.pop()
          }
          state.posts.unshift(action.payload)
        }
      
    },
    socketUpdateComment: (state, action) => {
      if(state.comments.find(x => x._id === action.payload._id) !== undefined) {
        state.comments = state.comments.map(x => x._id === action.payload._id ? action.payload : x )
      }
    },
    socketDeleteComment: (state, action) => {
      state.comments = state.comments.filter(x => x._id !== action.payload._id)
      state.userInfo = state.userInfo.filter(x => x._id !== action.payload._id)
    },
    socketAddComment: (state, action) => {
      
      if(action.payload.belongsTo === state.posts[0]._id){
        if(state.comments.length === 10){
          state.comments.pop()
      }
        state.comments.unshift(action.payload)
      
    }}
   
  },
  // Async cases, some change loading state.
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(saveNewPost.fulfilled, (state,action) => {
        state.status = 'idle';
        state.posts.unshift(action.payload)
        state.posts.pop()
      })
      .addCase(saveNewPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOldPost.fulfilled, (state,action) => {
        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
      })
      .addCase(deleteOldPost.fulfilled, (state,action) => {
        state.posts = state.posts.filter(post => post._id !== action.payload)
        state.userInfo[0].info = state.userInfo[0].info.filter(post => post._id !== action.payload)
      })
      .addCase(likeOldPost.fulfilled, (state,action) => {
        state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
      })
      .addCase(getPostsWithSearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPostsWithSearch.fulfilled, (state,action) => {
        state.posts = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
        state.status = 'idle';
      })
      .addCase(getSinglePostReco.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSinglePostReco.fulfilled, (state,action) => {
        state.status = 'idle';
        state.posts = action.payload.posts
        state.comments = action.payload.comments
      })
      .addCase(getSingleUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleUserInfo.fulfilled, (state,action) => {
        state.status = 'idle';
        state.userInfo = action.payload.userInfo
      })
      .addCase(saveNewComment.fulfilled, (state,action) => {
        state.status = 'idle';
        state.comments.unshift(action.payload)
      })
      .addCase(saveNewComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(likeOldComment.fulfilled, (state,action) => {
        state.comments = state.comments.map(comment => comment._id === action.payload._id ? action.payload : comment)
      })
      .addCase(deleteOldComment.fulfilled, (state,action) => {
        console.log('so here i am in the addcase section with my data..')
        console.log(action.payload)
        state.comments = state.comments.filter(comment => comment._id !== action.payload)
        state.userInfo[0].info = state.userInfo[0].info.filter(comment => comment._id !== action.payload)
      })
      .addCase(deleteAllContent.fulfilled, (state,action) => {
        state.userInfo[0].info = []
      })
      .addCase(deleteAccount.fulfilled, (state,action) => {
        state.userInfo[0].info = []
        state.userInfo[0].name = 'DELETED'
      })
  },
});

export const { editPost, socketUpdatePost, socketDeletePost, socketAddPost, socketAddComment, socketUpdateComment, socketDeleteComment, updateOnPostDetails } = postsSlice.actions;

//Memoized selectors for various state values.

export const selectOnPostDetails = createSelector(state => state.posts.onPostDetails, result => result)

export const selectCurrentPost = createSelector(state => state.posts.posts, state => state.posts.currentPostId, (posts,currentPost) => currentPost === '' ? false : posts.find(post => post._id === currentPost))

export const selectPaginationInfo = createSelector(state => state.posts.posts, state => state.posts.currentPage, state => state.posts.numberOfPages, (posts,currentPage,numberOfPages) => ({ posts, currentPage, numberOfPages}))

export const selectUserInfo = createSelector(state => state.posts.userInfo, info => info[0])

export const selectPosts = createSelector(state => state.posts.posts, posts => posts)

export const selectComments = createSelector(state => state.posts.comments, val => val)

export const selectNumberOfPages = createSelector(state => state.posts.numberOfPages, num => num)

export const selectCurrentId = createSelector(state => state.posts.currentPostId, val => val)

export const selectLoading = createSelector(state => state.posts.status, val => val === 'loading')


export default postsSlice.reducer;
