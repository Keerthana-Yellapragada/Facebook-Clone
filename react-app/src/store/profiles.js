import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************

// CRUD:
// Create a profile
// GET a profile
// Update/Edit a profile
// Delete a profile

///*************************************************************************** */
const GET_ALLPROFILES = 'profiles/getAllprofiles'
const GET_ONEPROFILE = 'profiles/getOneprofile'
const CREATE_PROFILE = 'profiles/createprofile'
const UPDATE_PROFILE = 'profiles/updateprofile'
const DELETE_PROFILE = 'profiles/removeprofile'

///*************************************************************************** */
// **** GET ALL profileS ****
const getAllProfiles = profiles => ({
    type: GET_ALLPROFILES,
    payload: profiles
})
///*************************************************************************** */
// **** GET ONE profile'S DETAILS ****
const getOneProfile = profile => ({
    type: GET_ONEPROFILE,
    payload: profile
})

///*************************************************************************** */
// **** CREATE A profile ****

const createProfile = profile => ({
    type: CREATE_PROFILE,
    payload: profile
})
///*************************************************************************** */
// **** EDIT/UPDATE A profile ****

const updateProfile = profile => ({
    type: UPDATE_PROFILE,
    payload: profile
})
///*************************************************************************** */
// **** DELETE A profile ****

const removeProfile = profileId => ({
    type: DELETE_PROFILE,
    payload: profileId
})

// *****************************************************************************
//************************************ THUNKS **********************************

// -------------------------  LOAD ALL profileS   ----------------------------------
export const loadAllProfiles = () => async dispatch => {
    const response = await csrfFetch('/api/profiles/')
    if (response.ok) {
        const profilesList = await response.json();
        dispatch(getAllProfiles(profilesList))
    }
}

//*************************************************************************** */

// -------------------------  LOAD ONE profile'S DETAILS   -------------------------


export const loadOneProfile = (profileId) => async dispatch => {
    const response = await csrfFetch(`/api/profiles/${profileId}/`);





    if (response.ok) {
        const profileInfo = await response.json();
        dispatch(getOneProfile(profileInfo))
    }
}


//*************************************************************************** */

// -------------------------  CREATE A profile   ----------------------------------

export const createNewProfile = (payload) => async dispatch => {

    const response = await csrfFetch(`/api/posts/${payload.post_id}/profiles/new/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })


    if (response.ok) {
        let profile = await response.json()

        dispatch(createProfile(profile))
        return profile
    }
}

//*************************************************************************** */

// -------------------------  EDIT A profile    ----------------------------------

export const editProfile = (editProfileInfo) => async dispatch => {

    const response = await csrfFetch(`/api/profiles/${editProfileInfo.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editProfileInfo)
    })



    if (response.ok) {

        const editedProfile = await response.json();
        dispatch(updateProfile(editedProfile))
        return editedProfile
    }
}

//*************************************************************************** */

// -------------------------  DELETE A profile  --------------------------------
export const deleteProfile = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/profiles/${payload.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(removeProfile(payload.id))
        return response
    }
}




// *****************************************************************************
// ******************************* REDUCERS ************************************

const initialState = {}

const profileReducer = (state = initialState, action) => {

    let newState;
    // *****************************************************************************
    switch (action.type) {
        case GET_ALLPROFILES:
            newState = {
                ...state
            }
            action.payload.profiles?.forEach((profile) => {
                newState[profile.id] = profile
            });
            return newState
            // *****************************************************************************
        case GET_ONEPROFILE:
            // newState = {}

            // newState[action.payload.id] = action.payload

            return {
                ...state, ...action.payload
            }

            // *****************************************************************************
            case CREATE_PROFILE:
                newState = {
                    ...state
                }
                newState[action.payload.id] = action.payload
                return newState
                // *****************************************************************************
            case UPDATE_PROFILE:
                newState = {
                    ...state
                }
                newState[action.payload.id] = action.payload

                return newState;


                // *****************************************************************************
            case DELETE_PROFILE:
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

export default profileReducer
