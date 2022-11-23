import { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { createNewPost, loadAllPosts} from "../../store/posts"

const NewPostForm = () => {
    const dispatch= useDispatch()
    const history= useHistory()

    // states
    const [post_content, setPostContent] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    // useEffect to load all Posts and refresh state
    useEffect(()=> {
        dispatch(loadAllPosts());
    },[dispatch])

    // select slice of state that we want
    const posts = useSelector(state=> Object.values(state.posts))
    const user = useSelector(state => state.session.user)

    if (!user){
        return null
    }
    if (!posts) {
        return null
    }

const submitHandler = async (e) => {
    e.preventDefault()
    const errors = []

    if (!post_content) {errors.push("Cannot leave field empty")};

    setValidationErrors(errors)

    if (!validationErrors.length) {
        const newPostPayload = {
            post_content,
            image_url
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
                value={post_content}
                placeholder="What's on your mind?"
              />

            <button>Add To Your Post</button>

              <input
              className="form-inputs"
              type="file"
              id = "upload-picture-button"
              name = "imageUrl"
              accept="image/*"
              //image/png, image/jpeg, image/jpg image/*
              // style = {{"display: none"}}
              onChange={(e) => setImageUrl(e.target.value)}
              value={image_url}

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

}

export default NewPostForm;
