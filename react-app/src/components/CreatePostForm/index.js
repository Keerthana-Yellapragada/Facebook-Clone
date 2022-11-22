import { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { createNewPost, loadAllPosts} from "../../store/posts"

const NewPostForm = () => {
    const dispatch= useDispatch()
    const history= useHistory()

    // states
    const [postContent, setPostContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    // useEffect to load all Posts and refresh state
    useEffect(()=> {
        dispatch(loadAllPosts());
    },[dispatch])

    // select slice of state that we want
    const posts = useSelector(state=> Object.values(state.posts))
    const user = useSelector(state => state.session.user)


const submitHandler = async (e) => {
    e.preventDefault()
    const errors = []

    if (!postContent) errors.push("Cannot leave field empty");

    setValidationErrors(errors)

    if (!validationErrors.length) {
        const newPostPayload = {
            postContent,
            imageUrl
        }

        const newPost = await dispatch(createNewPost(newPostPayload))
        history.push(`/`)
    }
}


  return (
    <div className="Outer-Form-Container">
      <div className="Inner-Form-Container">
        <form className="create-post-form" onSubmit={submitHandler}>
          <div className="create-post-form-title-box">
            <h1 className="title-words">Create Post</h1>
          </div>
          <div className="create-post-form-user-name-container">{user.first_name} {user.last_name}</div>
          <div className="errors">
            {validationErrors.length > 0 &&
              validationErrors.map((error) =>
                <div key={error}>{error}</div>
              )}
          </div>
          <div className="create-post-form-container">
              <input
                className="form-inputs"
                required
                type="text"
                name="postContent"
                onChange={(e) => setPostContent(e.target.value)}
                value={postContent}
                placeholder="What's on your mind?"
              />

            <label for="upload-picture-button"> Choose A Photo</label>
              <input
              className="form-inputs"
              type="file"
              id = "upload-picture-button"
              name = "imageUrl"
              accept="image/png, image/jpeg, image/jpg, image/*"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
                />
               {/* <label for="upload-picture-button">
                Choose A Photo
                <i class="fas fa-upload"></i>
               </label> */}


          </div>
          <div className="button-container">
            <button className="create-coder-button"
              type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );

















    return (<h1>CREATE POST FORM</h1>)

}

export default NewPostForm;
