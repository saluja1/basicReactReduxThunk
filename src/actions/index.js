import _ from 'lodash';
import axios from 'axios';

//Get all unique userId's from list of posts, iterate over unique userids and fetch user for each userid

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
 
 //Action Creators inside an Action Creator
   await dispatch(fetchPosts());

   const userIds = _.uniq( _.map(getState().posts,'userId'));
   userIds.forEach(id => dispatch(fetchUser(id))); 
 };


//Action Creator returning a function using Redux-Thunk
export const fetchPosts =  () => async dispatch => {

const response =  await axios.get('https://jsonplaceholder.typicode.com/posts');

dispatch({type: 'FETCH_POSTS', payload: response.data})
 
 };

export const fetchUser = id => async dispatch => {

   const response =  await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
   dispatch({type: 'FETCH_USER', payload: response.data});
};


