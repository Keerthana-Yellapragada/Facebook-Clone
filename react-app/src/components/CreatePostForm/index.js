import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { createNewPost, loadAllPosts } from "../../store/posts"
import './CreatePostForm.css'
import UploadPicture from "../Images/UploadImages";


const NewPostForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  // states
  const [post_content, setPostContent] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [validationErrors, setValidationErrors] = useState([])
  const [imageLoading, setImageLoading] = useState(false);

  // useEffect to load all Posts and refresh state
  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch])

  useEffect(() => {
    const errors = [];

    // const validUrls = ["img", "jpg", "jpeg", "png"]
    // let urlArray = image_url.split(".")
    // let urlExtension = urlArray[urlArray.length - 1]

    // if (image_url && !validUrls.includes(urlExtension)) {
    //   errors.push("Please enter an image in .png, .jpg, .jpeg, or .img format")
    // }
    if (post_content & post_content.length < 1) { errors.push("Cannot submit a blank field") }

    if (post_content.length > 2200) { errors.push("You have reached your 2200 character limit") }

    setValidationErrors(errors)
  }, [post_content, selectedFile])

  // select slice of state that we want
  const posts = useSelector(state => Object.values(state.posts))
  const user = useSelector(state => state.session.user)

  if (!user) {
    return null
  }
  if (!posts) {
    return null
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const errors = []

    if (!post_content) { errors.push("Cannot leave field empty") };

    setValidationErrors(errors)

    // const formData = FormData()
    // formData.append("user_id", user.id)
    // formData.append("url", image_url)


    if (!validationErrors.length) {
      // const newPostPayload = {
      //   post_content,
      //   image_url
      // }

      const formData = new FormData()
      console.log("THIS IS FORM DATA", formData)

      formData.append("user_id", user.id)
      formData.append("image_url", selectedFile)
      console.log("SELECTED FILE IN FORMDATA!!!", formData.get("image_url"))
      formData.append("post_content", post_content)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
      setImageLoading(true);
      //  axios
      //   //  .post("image_url", formData)
      //    .then((res) => {
      //      alert("File Upload success");
      //    })
      //    .catch((err) => alert("File Upload Error"));
      // debugger

      console.log("THIS IS FORM DATA AFTER APPENDING", formData)

      for (let key in formData) {
        console.log(key, formData[key]);
        formData.append(key, formData[key]);
      }

      const newPost = await dispatch(createNewPost(formData)).then(() => history.push(`/homepage`))
    }
  }


  return (
    <div className="Outer-Form-Container">
      <div className="Inner-Form-Container">
        <form className="create-post-form" onSubmit={submitHandler} encType="multipart/form-data">


          <div className="create-post-user-info-container">
            <div className='create-post-user-profile-pic-container user-profile-pic'>
              <img
                src={user.profile_image} alt="user-profile-pics"
              />
            </div>
            <div className="create-post-form-user-name-container">{user.first_name} {user.last_name}</div>
          </div>


          <div className="errors">
            {validationErrors.length > 0 &&
              validationErrors.map((error) =>
                <div key={error}>{error}</div>
              )}
            {post_content ? (
              <span className="charLeft">
                {post_content.length}/2200
              </span>
            ) : null}

          </div>
          <div className="create-post-form-container">
            <textarea
              className="form-inputs post-content-input"
              required
              type="text"
              name="postContent"
              minLength={1}
              maxLength={2200}
              onChange={(e) => setPostContent(e.target.value)}
              value={post_content}
              placeholder={`What's on your mind, ${user.first_name}?`}
            />



            {/* <input
              type="url"
              className="form-inputs"
              name="url"
              id="url"
              placeholder="Enter an https:// URL  : https://example.com"
              pattern="https://.*" size="30"
              onChange={(e) => setImageUrl(e.target.value)}
              value={image_url}
            /> */}
            {/* <input
              type="file"
              className="form-inputs file-input"
              name="url"
              id="url"
              title="Upload an image"
              placeholder="upload an image"
              capture="camera"
              accept="image/jpeg, image/jpg, image/png, image/gif"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            // value={selectedFile}
            /> */}

            <input
              type="file"
              className="form-inputs file-input"
              name="url"
              id="url"
              title="Upload an image"
              placeholder="upload an image"
              capture="camera"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />



            {/* < UploadPicture /> */}

          </div>
          <div className="button-container">
            <button className="create-post-button"
              disabled={!!validationErrors.length}
              type="submit">Post</button>
          </div>
          {(imageLoading)&& <p>Loading...</p>}
        </form>
      </div>
    </div>
  );

}

export default NewPostForm;
