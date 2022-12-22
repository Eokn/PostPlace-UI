import axios from 'axios'

//Add base url to the server on heroku and the authorization header which accepts the JWT.
const API = axios.create({ baseURL: process.env.REACT_APP_SERVER })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

//API calls to the server.
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)

export const fetchPostReco = (id) => API.get(`/posts/${id}`)

export const fetchUserInfo = (id) => API.get(`/users/${id}`)

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&page=${searchQuery.page}`)

export const createPost = (postData,name) => API.post('/posts', {...postData,name})

export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const createComment = (message, belongsTo, name, creator) => API.post(`/posts/${belongsTo}/comments`, {message, belongsTo, name, creator})

export const likeComment = (belongsTo, id) => API.patch(`/posts/${belongsTo}/comments/${id}/likeComment`)

export const deleteComment = (belongsTo, id) => API.delete(`/posts/${belongsTo}/comments/${id}`)

export const deleteContent = (items) => API.delete(`/posts/deleteAllContent`, {data: items})

export const deleteUserAccount = (items) => API.delete(`/posts/deleteAccount`, {data: items})


export const apiSignIn = (formData) => API.post('/users/signin', formData)

export const apiSignUp = (formData) => API.post('/users/signup', formData)

export const apiGoogleSignUp = ({ name, email }) => API.post('/users/googlesignup', { name, email })