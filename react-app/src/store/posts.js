

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

        dispatch(getAllPosts(postsList))
    }
}

//*************************************************************************** */

// -------------------------  LOAD ONE POST'S DETAILS   -------------------------


export const loadOnePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}/`);

    if (response.ok) {
        const postInfo = await response.json();

        dispatch(getOnePost(postInfo))
    }
}


//*************************************************************************** */

// -------------------------  CREATE A POST   ----------------------------------

export const createNewPost = (formData) => async dispatch => {

console.log("THUNK FORMDATA", formData.get("image_url"))
console.log("THIS IS FORMDATA IN CREATE POST THUNK", formData)
debugger

    const response = await fetch('/api/posts/new/', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        //     // IS THIS THE CORRECT CONTENT TYPE!?!
        // },
        body: formData
    })

debugger
    if (response.ok) {

        console.log("IS RESPONSE OK IN CREATEPOST THUNK")
        // let post = await response.json()
        const { resPost } = await response.json();
        // const newPost = await response.json()
        await dispatch(createPost(resPost))
        // return newPost
    } else {
        console.log("There was an error making your post!")
        // const res = await response.json()
        debugger
        console.log(response)
    }
}

//*************************************************************************** */

// -------------------------  EDIT A POST    ----------------------------------

export const editPost = (formData, postId) => async dispatch => {
    console.log("edit THUNK FORMDATA", formData.get("image_url"))
    console.log("THIS IS FORMDATA IN edit POST THUNK", formData)
    console.log("This is post id  in thunk", postId)

    debugger

    const response = await csrfFetch(`/api/posts/${postId}/`, {
        method: 'PUT',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: formData
    })


    debugger
    if (response.ok) {
        console.log("IS RESPONSE OK IN edit POST THUNK")

        const {editedPost} = await response.json();
        await dispatch(updatePost(editedPost))
        // return editedPost
    } else {
        console.log("There was an error editing your post")
        debugger
        console.log(response)
    }
}

//*************************************************************************** */

// -------------------------  DELETE A POST  --------------------------------
export const deletePost = (payload) => async dispatch => {
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
