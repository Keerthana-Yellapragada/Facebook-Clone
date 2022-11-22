

import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************

// CRUD:
// Create a Post
// GET a post
// Update/Edit a post
// Delete a post

///*************************************************************************** */
const GET_ALLPOSTS = 'posts/getAllPosts'
const GET_ONEPOST = 'posts/getOnepost'
const CREATE_POST = 'posts/createPost'
const UPDATE_POST = 'posts/updatePost'
const DELETE_POST = 'posts/removePost'

///*************************************************************************** */
// **** GET ALL postS ****
const getAllPosts = posts => ({
    type: GET_ALLPOSTS,
    payload: posts
})
///*************************************************************************** */
// **** GET ONE post DETAILS ****
const getOnePost = post => ({
    type: GET_ONEPOST,
    payload: post
})

///*************************************************************************** */
// **** CREATE A post ****

const createPost = post => ({
    type: CREATE_POST,
    payload: post
})
///*************************************************************************** */
// **** EDIT/UPDATE A post ****

const updatePost = post => ({
    type: UPDATE_POST,
    payload: post
})
///*************************************************************************** */
// **** DELETE A post ****

const removePost = postId => ({
    type: DELETE_POST,
    payload: postId
})

// *****************************************************************************
//************************************ THUNKS **********************************

// -------------------------  LOAD ALL POSTS   ----------------------------------
export const loadAllPosts = () => async dispatch => {
    const response = await csrfFetch('/api/posts/')
    if (response.ok) {
        const postsList = await response.json();
        console.log("this is posts list IN THUNK", postsList)
        dispatch(getAllPosts(postsList))
    }
}

//*************************************************************************** */

// -------------------------  LOAD ONE POST'S DETAILS   -------------------------


export const loadOnePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}/`);
    // console.log("DID TI REACH GET ONE post THUNK")




    if (response.ok) {
        const postInfo = await response.json();
        //  console.log("post INFO IN THUNK", postInfo)
        dispatch(getOnePost(postInfo))
    }
}


//*************************************************************************** */

// -------------------------  CREATE A POST   ----------------------------------

export const createNewPost = (payload) => async dispatch => {
    // console.log("did this reach?")
    // console.log("this is the payload", payload)
    const response = await csrfFetch('/api/posts/new/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    // console.log("did it reach here? after response?")

    if (response.ok) {
        let post = await response.json()
        console.log("this is the post if response.ok", post)
        dispatch(createPost(post))
        return post
    }
}

//*************************************************************************** */

// -------------------------  EDIT A POST    ----------------------------------

export const editpost = (editpostInfo) => async dispatch => {

    const response = await csrfFetch(`/api/posts/${editpostInfo.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editpostInfo)
    })

    if (response.ok) {
        const editedpost = await response.json();
        dispatch(updatePost(editedpost))
        return editedpost
    }
}

//*************************************************************************** */

// -------------------------  DELETE A POST  --------------------------------
export const deletepost = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${payload.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(removePost(payload.id))
        return response
    }
}




// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const postReducer = (state = initialState, action) => {

    let newState;
    // *****************************************************************************
    switch (action.type) {
        case GET_ALLPOSTS:
            newState = {
                ...state
            }
            action.payload.Posts?.forEach((post) => {
                newState[post.id] = post
            });
            return newState
            // *****************************************************************************
        case GET_ONEPOST:
            // newState = {}

            // newState[action.payload.id] = action.payload

            return {
                ...state, ...action.payload
            }

            // *****************************************************************************
            case CREATE_POST:
                newState = {
                    ...state
                }
                newState[action.payload.id] = action.payload
                return newState
                // *****************************************************************************
            case UPDATE_POST:
                newState = {
                    ...state
                }
                newState[action.payload.id] = action.payload

                return newState;


                // *****************************************************************************
            case DELETE_POST:
                newState = {
                    ...state
                }
                delete newState[action.payload]
                return newState
                // *****************************************************************************
            default:
                return state

    }
}
// *****************************************************************************

export default postReducer