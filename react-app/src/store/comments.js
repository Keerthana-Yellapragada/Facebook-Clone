import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************

// CRUD:
// Create a comment
// GET a comment
// Update/Edit a comment
// Delete a comment

///*************************************************************************** */
const GET_ALLCOMMENTS = 'comments/getAllComments'
const GET_ONECOMMENT = 'comments/getOneComment'
const CREATE_COMMENT = 'comments/createComment'
const UPDATE_COMMENT = 'comments/updateComment'
const DELETE_COMMENT = 'comments/removeComment'

///*************************************************************************** */
// **** GET ALL COMMENTS ****
const getAllComments = comments => ({
    type: GET_ALLCOMMENTS,
    payload: comments
})
///*************************************************************************** */
// **** GET ONE COMMENT'S DETAILS ****
const getOneComment = comment => ({
    type: GET_ONECOMMENT,
    payload: comment
})

///*************************************************************************** */
// **** CREATE A COMMENT ****

const createComment = comment => ({
    type: CREATE_COMMENT,
    payload: comment
})
///*************************************************************************** */
// **** EDIT/UPDATE A COMMENT ****

const updateComment = comment => ({
    type: UPDATE_COMMENT,
    payload: comment
})
///*************************************************************************** */
// **** DELETE A COMMENT ****

const removeComment = commentId => ({
    type: DELETE_COMMENT,
    payload: commentId
})

// *****************************************************************************
//************************************ THUNKS **********************************

// -------------------------  LOAD ALL COMMENTS   ----------------------------------
export const loadAllComments = () => async dispatch => {
    const response = await csrfFetch('/api/comments/')
    if (response.ok) {
        const commentsList = await response.json();
        dispatch(getAllComments(commentsList))
    }
}

//*************************************************************************** */

// -------------------------  LOAD ONE COMMENT'S DETAILS   -------------------------


export const loadOneComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}/`);





    if (response.ok) {
        const commentInfo = await response.json();
        dispatch(getOneComment(commentInfo))
    }
}


//*************************************************************************** */

// -------------------------  CREATE A COMMENT   ----------------------------------

export const createNewComment = (payload) => async dispatch => {

    const response = await csrfFetch(`/api/posts/${payload.post_id}/comments/new/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })


    if (response.ok) {
        let comment = await response.json()

        dispatch(createComment(comment))
        return comment
    }
}

//*************************************************************************** */

// -------------------------  EDIT A COMMENT    ----------------------------------

export const editComment = (editcommentInfo) => async dispatch => {

    const response = await csrfFetch(`/api/comments/${editcommentInfo.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editcommentInfo)
    })



    if (response.ok) {

        const editedcomment = await response.json();
        dispatch(updateComment(editedcomment))
        return editedcomment
    }
}

//*************************************************************************** */

// -------------------------  DELETE A COMMENT  --------------------------------
export const deleteComment = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${payload.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(removeComment(payload.id))
        return response
    }
}




// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const commentReducer = (state = initialState, action) => {

    let newState;
    // *****************************************************************************
    switch (action.type) {
        case GET_ALLCOMMENTS:
            newState = {
                ...state
            }
            action.payload.Comments?.forEach((comment) => {
                newState[comment.id] = comment
            });
            return newState
            // *****************************************************************************
        case GET_ONECOMMENT:
            // newState = {}

            // newState[action.payload.id] = action.payload

            return {
                ...state, ...action.payload
            }

            // *****************************************************************************
            case CREATE_COMMENT:
                newState = {
                    ...state
                }
                newState[action.payload.id] = action.payload
                return newState
                // *****************************************************************************
            case UPDATE_COMMENT:
                newState = {
                    ...state
                }
                newState[action.payload.id] = action.payload

                return newState;


                // *****************************************************************************
            case DELETE_COMMENT:
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

export default commentReducer
