import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************

// CRUD:
// Create a Friend
// GET a Friend
// Update/Edit a Friend
// Delete a Friend

///*************************************************************************** */
const GET_ALLFriendS = 'Friends/getAllFriends'
const GET_ONEFriend = 'Friends/getOneFriend'
const CREATE_Friend = 'Friends/createFriend'
const DELETE_Friend = 'Friends/removeFriend'

///*************************************************************************** */
// **** GET ALL Friends ****
const getAllFriends = Friends => ({
    type: GET_ALLFRIENDS,
    payload: Friends
})
///*************************************************************************** */
// **** GET ONE Friend DETAILS ****
const getOneFriend = Friend => ({
    type: GET_ONEFriend,
    payload: Friend
})

///*************************************************************************** */
// **** CREATE A Friend ****

const createFriend = Friend => ({
    type: CREATE_Friend,
    payload: Friend
})

///*************************************************************************** */
// **** DELETE A Friend ****

const removeFriend = FriendId => ({
    type: DELETE_Friend,
    payload: FriendId
})


// *****************************************************************************
//************************************ THUNKS **********************************

/*************************************************************************** */
// -------------------------  Load All Friends   ----------------------------------



export const loadAllFriends = () => async dispatch => {
    const response = await csrfFetch('/api/Friends/')
    if (response.ok) {
        const FriendsList = await response.json();

        dispatch(getAllFriends(FriendsList))
    }
}


/*************************************************************************** */

// -------------------------  CREATE A Friend   ----------------------------------

export const createNewFriend = (payload) => async dispatch => {
    console.log("DID IT REACH CREATE Friend THUNK")
    const response = await csrfFetch('/api/Friends/new/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })


    if (response.ok) {
        console.log("CREATE Friend RESPONSE IS OK")
        let Friend = await response.json()

        dispatch(createFriend(Friend))
        return Friend
    }
}


//*************************************************************************** */

// -------------------------  DELETE A Friend  --------------------------------
export const deleteFriend = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/Friends/${payload.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(removeFriend(payload.id))
        return response
    }
}
// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const FriendReducer = (state = initialState, action) => {

    let newState;
    // *****************************************************************************
    switch (action.type) {
        case GET_ALLFriendS:
            newState = {
                ...state
            }
            console.log("REACHED GET ALL FriendS REDUCER")
            action.payload.Friends ? .forEach((Friend) => {
                newState[Friend.id] = Friend
            });
            return newState
            // *****************************************************************************
        case GET_ONEFriend:
            // newState = {}

            // newState[action.payload.id] = action.payload

            return {
                ...state, ...action.payload
            }

            // *****************************************************************************
            case CREATE_Friend:
                newState = {
                    ...state
                }

                console.log("IN CREATE Friend REDUCER")
                newState[action.payload.id] = action.payload
                return newState

                // *****************************************************************************
            case DELETE_Friend:
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

export default FriendReducer
