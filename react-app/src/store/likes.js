import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************

// CRUD:
// Create a like
// GET a like
// Update/Edit a like
// Delete a like

///*************************************************************************** */
const GET_ALL_LIKES = 'likes/getAllLikes'
const GET_ONE_LIKE = 'likes/getOneLike'
const CREATE_LIKE = 'likes/createLike'
const UPDATE_LIKE = 'likes/updateLike'
const DELETE_LIKE = 'likes/removeLike'

///*************************************************************************** */
// **** GET ALL likeS ****
const getLikes = likes => ({
    type: GET_ALL_LIKES,
    payload: likes
})
///*************************************************************************** */
// **** GET ONE like DETAILS ****
const getLike = like => ({
    type: GET_ONE_LIKE,
    payload: like
})

///*************************************************************************** */
// **** CREATE A like ****

const createLike = like => ({
    type: CREATE_LIKE,
    payload: like
})
///*************************************************************************** */
// **** EDIT/UPDATE A like ****

const editLike = like => ({
    type: UPDATE_LIKE,
    payload: like
})
///*************************************************************************** */
// **** DELETE A like ****

const deleteLike = likeId => ({
    type: DELETE_LIKE,
    payload: likeId
})

// *****************************************************************************
//************************************ THUNKS **********************************
// -------------------------  LOAD ALL LIKES   ----------------------------------
export const loadAllLikes = () => async dispatch => {
    const response = await csrfFetch(`/api/likes/`)
    if (response.ok) {
        const likesList = await response.json();

        dispatch(getLikes(likesList))
    }
}

// -------------------------  LOAD ALL LIKES OF A POST BY POST ID   ----------------------------------
export const loadPostLikes = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}/likes/`)
    if (response.ok) {
        const likesList = await response.json();

        dispatch(getLikes(likesList))
    }
}

//*************************************************************************** */

// -------------------------  LOAD ONE like'S DETAILS   -------------------------


export const loadOnelike = (likeId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/${likeId}/`);



    if (response.ok) {
        const likeInfo = await response.json();
        dispatch(getLike(likeInfo))
    }
}


//*************************************************************************** */

// -------------------------  CREATE A like   ----------------------------------

export const createNewLike = (payload) => async dispatch => {
    const response = await csrfFetch(`api/posts/${payload.post_id}/likes/new/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        let like = await response.json()
        dispatch(createLike(like))
        return like
    }
}

//*************************************************************************** */

// -------------------------  EDIT A like    ----------------------------------

export const updateLike = (editlikeInfo) => async dispatch => {

    const response = await csrfFetch(`/api/likes/${editlikeInfo.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editlikeInfo)
    })


    if (response.ok) {

        const editedlike = await response.json();
        dispatch(editLike(editedlike))
        return editedlike
    }
}

//*************************************************************************** */

// -------------------------  DELETE A like  --------------------------------
export const removeLike = (likeId) => async dispatch => {

    const response = await csrfFetch(`/api/likes/${likeId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
       let deletedLike= dispatch(deleteLike(likeId))
        return deletedLike
    }
}




// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const likesReducer = (state = initialState, action) => {

    let newState;
    // *****************************************************************************
    switch (action.type) {
        case GET_ALL_LIKES:
            newState = {
                ...state
            }
            action.payload.Likes?.forEach((like) => {
                newState[like.id] = like
            });
            return newState
            // *****************************************************************************
        case GET_ONE_LIKE:
            // newState = {}

            // newState[action.payload.id] = action.payload

            return {
                ...state, ...action.payload
            }

            // *****************************************************************************
            case CREATE_LIKE:
                newState = {
                    ...state
                }
                newState[action.payload.id] = action.payload
                return newState
                // *****************************************************************************
            case UPDATE_LIKE:
                newState = {
                    ...state
                }
                newState[action.payload.id] = action.payload

                return newState;


                // *****************************************************************************
            case DELETE_LIKE:
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

export default likesReducer
