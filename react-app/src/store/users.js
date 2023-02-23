import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************

// CRUD:
// Create a user
// GET a user
// Update/Edit a user
// Delete a user

///*************************************************************************** */
const GET_ALLUSERS = 'users/getAllusers'
const GET_ONEUSER = 'users/getOneuser'
// const CREATE_user = 'users/createuser'
// const UPDATE_user = 'users/updateuser'
const DELETE_USER = 'users/removeuser'

///*************************************************************************** */
// **** GET ALL USERS ****
const getAllUsers = users => ({
    type: GET_ALLUSERS,
    payload: users
})
///*************************************************************************** */
// **** GET ONE user DETAILS ****
const getOneUser = user => ({
    type: GET_ONEUSER,
    payload: user
})

///*************************************************************************** */
// **** CREATE A user ****

// const createUser = user => ({
//     type: CREATE_USER,
//     payload: user
// })
///*************************************************************************** */
// **** EDIT/UPDATE A user ****

// const updateUser = user => ({
//     type: UPDATE_USER,
//     payload: user
// })
///*************************************************************************** */
// **** DELETE A user ****

const removeUser = userId => ({
    type: DELETE_USER,
    payload: userId
})

// *****************************************************************************
//************************************ THUNKS **********************************

// -------------------------  LOAD ALL userS   ----------------------------------
export const loadAllUsers = () => async dispatch => {
    const response = await csrfFetch('/api/users/')
    if (response.ok) {
        const usersList = await response.json();

        dispatch(getAllUsers(usersList))
    }
}

//*************************************************************************** */

// -------------------------  LOAD ONE user's DETAILS   -------------------------


export const loadOneUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/`);

    if (response.ok) {
        const userInfo = await response.json();

        dispatch(getOneUser(userInfo))
    }
}


//*************************************************************************** */

// -------------------------  CREATE A user   ----------------------------------

// export const createNewUser = (payload) => async dispatch => {

//     const response = await csrfFetch('/api/users/new/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     })


//     if (response.ok) {
//         let user = await response.json()

//         dispatch(createUser(user))
//         return user
//     }
// }

//*************************************************************************** */

// -------------------------  EDIT A user    ----------------------------------

// export const edituser = (edituserInfo) => async dispatch => {

//     const response = await csrfFetch(`/api/users/${edituserInfo.id}/`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(edituserInfo)
//     })



//     if (response.ok) {

//         const editeduser = await response.json();
//         dispatch(updateuser(editeduser))
//         return editeduser
//     }
// }

//*************************************************************************** */

// -------------------------  DELETE A user  --------------------------------
export const deleteuser = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/users/${payload.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(removeUser(payload.id))
        return response
    }
}




// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const userReducer = (state = initialState, action) => {

    let newState;
    // *****************************************************************************
    switch (action.type) {
        case GET_ALLUSERS:
            newState = {
                ...state
            }
            action.payload.users ? .forEach((user) => {
                newState[user.id] = user
            });
            return newState
            // *****************************************************************************
        case GET_ONEUSER:
            // newState = {}

            // newState[action.payload.id] = action.payload

            return {
                ...state, ...action.payload
            }

            // *****************************************************************************
            case CREATE_USER:
                newState = {
                    ...state
                }
                newState[action.payload.id] = action.payload
                return newState
                // *****************************************************************************
            case UPDATE_USER:
                newState = {
                    ...state
                }
                newState[action.payload.id] = action.payload

                return newState;


                // *****************************************************************************
            case DELETE_USER:
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

export default userReducer
