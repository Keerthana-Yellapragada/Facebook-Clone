import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************

// CRUD:
// Create a friendship
// GET a friendship
// Update/Edit a friendship
// Delete a friendship

///*************************************************************************** */
const GET_ALLFRIENDSHIPS = 'friendships/getAllFriendships'
const GET_ONEFRIENDSHIP = 'friendships/getOneFriendship'
const CREATE_FRIENDSHIP = 'friendships/createFriendship'
const UPDATE_FRIENDSHIP = 'friendships/updateFriendship'
const DELETE_FRIENDSHIP = 'friendships/removeFriendship'

///*************************************************************************** */
// **** GET ALL friendships ****
const getAllFriendships = friendships => ({
    type: GET_ALLFRIENDSHIPS,
    payload: friendships
})
///*************************************************************************** */
// **** GET ONE friendship DETAILS ****
const getOneFriendship = friendship => ({
    type: GET_ONEFRIENDSHIP,
    payload: friendship
})

///*************************************************************************** */
// /*** UPDATE FRIENDSHIP DETAILS */
const editFriendship = friendship => ({
    type: UPDATE_FRIENDSHIP,
    payload: friendship
})

///*************************************************************************** */
// **** CREATE A friendship ****

const createFriendship = friendship => ({
    type: CREATE_FRIENDSHIP,
    payload: friendship
})

///*************************************************************************** */
// **** DELETE A friendship ****

const removeFriendship = friendshipId => ({
    type: DELETE_FRIENDSHIP,
    payload: friendshipId
})


// *****************************************************************************
//************************************ THUNKS **********************************

/*************************************************************************** */
// -------------------------  Load All friendships   ----------------------------------



export const loadAllFriendships = () => async dispatch => {
    const response = await csrfFetch('/api/friendships/')
    if (response.ok) {
        const friendshipsList = await response.json();

        dispatch(getAllFriendships(friendshipsList))
    }
}


/*************************************************************************** */
// -------------------------  GET ONE friendship   ----------------------------------

export const getFriendshipDetails = (friendshipId) => async dispatch => {
    const response = await csrfFetch(`/api/friendships/${friendshipId}/`);

    if (response.ok) {
        const friendShipInfo = await response.json();

        dispatch(getOneFriendship(friendshipInfo))
    }
}


/*************************************************************************** */

// -------------------------  CREATE A friendship   ----------------------------------

export const createNewFriendship = (payload) => async dispatch => {
    console.log("DID IT REACH CREATE FRIENDSHIP THUNK")
    const response = await csrfFetch('/api/friendships/new/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })


    if (response.ok) {
        console.log("CREATE FRIENDSHIP RESPONSE IS OK")
        let friendship = await response.json()

        dispatch(createFriendship(friendship))
        return friendship
    }
}

//*************************************************************************** */

// -------------------------  UPDATE A friendship  --------------------------------
// accepting friendship
export const updateFriendship = (editFriendshipInfo) => async dispatch => {

    const response = await csrfFetch(`/api/friendships/${editFriendshipInfo.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editFriendshipInfo)
    })

    if (response.ok) {
        const response = await csrfFetch()
        const editedFriendship = await response.json();
        dispatch(editFriendship(editedFriendship))

        return editedFriendship
    }
}

//*************************************************************************** */

// -------------------------  DELETE A friendship  --------------------------------
export const deleteFriendship = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/friendships/${payload.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(removeFriendship(payload.id))
        return response
    }
}
// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const friendshipReducer = (state = initialState, action) => {

    let newState;
    // *****************************************************************************
    switch (action.type) {
        case GET_ALLFRIENDSHIPS:
            newState = {
                ...state
            }
            console.log("REACHED GET ALL FRIENDSHIPS REDUCER")
            action.payload.Friendships?.forEach((friendship) => {
                newState[friendship.id] = friendship
            });
            return newState
        // *****************************************************************************
        case GET_ONEFRIENDSHIP:
            // newState = {}

            // newState[action.payload.id] = action.payload

            return {
                ...state, ...action.payload
            }

        // *****************************************************************************
        case CREATE_FRIENDSHIP:
            newState = {
                ...state
            }

            console.log("IN CREATE FRIENDSHIP REDUCER")
            newState[action.payload.id] = action.payload
            return newState

        // *****************************************************************************

        case UPDATE_FRIENDSHIP:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload

            return newState;


        // *****************************************************************************
        case DELETE_FRIENDSHIP:
            console.log("REACHED DELETE FRIENDS REducER")
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

export default friendshipReducer
