import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { createNewProfile, loadAllProfiles } from "../../store/profiles"
import './CreateProfileForm.css'
// import UploadPicture from "../Images/UploadImages";
// // import axios from 'axios'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const NewProfileForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    // states

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState('')
    const [gender, setGender] = useState(null)
    // const [day, setDay] = useState("")
    // const [month, setMonth] = useState("")
    // const [year, setYear] = useState("")
    const [validationErrors, setValidationErrors] = useState([])
    const [profile_image, setProfileImage] = useState(null)
    const [birthDate, setBirthDate] = useState(new Date());

    useEffect(() => {
        dispatch(loadAllProfiles());
    }, [dispatch])

    useEffect(() => {
        const errors = [];

        if (bio & bio.length < 1) { errors.push("Cannot submit a blank field") }
        if (bio.length > 25) { errors.push("You have reached your 2200 character limit") }

        setValidationErrors(errors)

    }, [first_name, last_name, email, bio, gender, profile_image, birthDate])

    // select slice of state that we want
    const profiles = useSelector(state => Object.values(state.profiles))
    const user = useSelector(state => state.session.user)

    if (!user) {
        return null
    }
    if (!profiles) {
        return null
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const errors = []

        if (!bio || !first_name || !last_name || !gender || !email || birthDate) { errors.push("Cannot leave field empty") };

        setValidationErrors(errors)

        if (!validationErrors.length) {
            const newProfilePayload = {
                bio,
                first_name,
                last_name,
                gender,
                email,
                birthDate


            }


            const newProfile = await dispatch(createNewProfile(newProfilePayload)).then(() => history.push(`/`))
        }
    }


    return (
        <div className="Outer-Form-Container">
            <div className="Inner-Form-Container">

                <form className="create-profile-form" onSubmit={submitHandler}>

                    <div>Your Profile</div>




                    <div className="errors">
                        {validationErrors.length > 0 &&
                            validationErrors.map((error) =>
                                <div key={error}>{error}</div>
                            )}

                        {/* character counter */}
                        {bio ? (
                            <span className="charLeft">
                                {bio.length}/2200
                            </span>
                        ) : null}

                    </div>

                    <div className="create-profile-form-container">

                        <div className="profile-form-inputs">
                            <label htmlFor="profile-bio">About me</label>
                            <textarea
                                className="form-inputs profile-content-input"
                                required
                                id="profile-bio"
                                type="text"
                                name="BioContent"
                                minLength={1}
                                maxLength={2200}
                                onChange={(e) => setBio(e.target.value)}
                                value={bio}
                                placeholder={`About Me`}
                            />
                        </div>

                        <div className="profile-form-inputs">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                id="first-name"
                                className="form-inputs profile-content-input"
                                required
                                minLength={1}
                                maxLength={25}
                                value={first_name}
                                placeholder="Ex. John"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="profile-form-inputs">
                            <label htmlFor="last-name">Last Name</label>
                            <input

                                type="text"
                                id="last-name"
                                className="form-inputs profile-content-input"
                                required
                                minLength={1}
                                maxLength={25}
                                value={last_name}
                                placeholder="Doe"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>



                        <div className="profile-form-inputs">
                            <label htmlFor="gender">What is your gender?</label>
                            <select id="gender">
                               <option value="" disabled selected>- - -</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="nonbinary">Nonbinary</option>
                                <option value="transgender">Transgender</option>
                                <option value="other">Other</option>

                            </select>
                        </div>

                        <div className="profile-form-inputs birthdate-container">
                            <label htmlFor="birthdate">When is your birthday?</label>
                            <DatePicker
                                // showIcon
                                id="birthdate"
                                selected={birthDate}
                                value={birthDate}
                                onChange={date => setBirthDate(date)}
                            />
                        </div>


                        <div className="button-container profile-form-inputs">
                            <button className="create-profile-button"
                                disabled={!!validationErrors.length}
                                type="submit">Create Profile</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );

}

export default NewProfileForm;
