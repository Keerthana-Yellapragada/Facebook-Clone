import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPost, loadAllPosts } from "../../store/posts";
import "./EditPostForm.css";

const EditPostForm = ({ postId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // states
  const posts = useSelector((state) => Object.values(state.posts));
  const user = useSelector((state) => state.session.user);
  const postInfo = useSelector((state) => state.posts[postId]);

  const [postContent, setPostContent] = useState(postInfo.post_content);
  // const [imageUrl, setImageUrl] = useState(postInfo.image_url);
  const [validationErrors, setValidationErrors] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch, selectedFile]);

  useEffect(() => {
    const errors = [];

    // const validUrls = ["img", "jpg", "jpeg", "png"];
    // let urlArray = imageUrl.split(".");
    // let urlExtension = urlArray[urlArray.length - 1];

    // if (imageUrl && !validUrls.includes(urlExtension)) {
    //   errors.push("Please enter an image in .png, .jpg, .jpeg, or .img format");
    // }

    if (postContent & postContent.length < 1) {
      errors.push("Cannot submit a blank field")
    }

    if (postContent.length > 2200) {
      errors.push("You have exceeded your 2000 character limit")
    }
    setValidationErrors(errors);
  }, [postContent, selectedFile]);

  if (!user) {
    return null;
  }
  if (!posts) {
    return null;
  }
  if (!postInfo) {
    return null;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = [];

    if (!postContent) {
      errors.push("Cannot leave field empty");
    }
    if (!selectedFile) {
      setSelectedFile(postInfo.image_url);
    }

    setValidationErrors(errors);

    if (!validationErrors.length) {
      // const editedPostPayload = {
      //   id: postInfo.id,
      //   post_content: postContent,
      //   image_url: selectedFile,
      // };

      const formData = new FormData()
      console.log("THIS IS FORM DATA", formData)

      formData.append("user_id", user.id)
      formData.append("image_url", selectedFile)
      console.log("SELECTED FILE IN FORMDATA!!!", formData.get("image_url"))
      formData.append("post_content", postContent)

      setImageLoading(true);


      console.log("THIS IS FORM DATA AFTER APPENDING", formData)

      for (let key in formData) {
        console.log(key, formData[key]);
        formData.append(key, formData[key]);
      }


      const editedPost = await dispatch(editPost(formData, postInfo.id)).then(()=>history.push(`/`))
    }
  };

  return (
    <>
      <div className="Edit-Post-Outer-Form-Container">
        <div className="Inner-Form-Container">
          <form className="create-post-form" onSubmit={submitHandler}>
            <div className="create-post-form-title-box">
              <h1 className="edit-post-title title-words">Edit Post</h1>
            </div>
            <div className="create-post-form-user-name-container">
              {user.first_name} {user.last_name}
            </div>
            <div className="errors">
              {validationErrors.length > 0 &&
                validationErrors.map((error) => <div key={error}>{error}</div>)}
              {postContent ? (
                <span className="charLeft">
                  {postContent.length}/2200
                </span>
              ) : null}
            </div>
            <div className="create-post-form-container">
              <textarea
                className="form-inputs form-text-input-field"
                required
                type="text"
                name="postContent"
                minLength={1}
                maxLength={2200}
                onChange={(e) => setPostContent(e.target.value)}
                value={postContent}
                placeholder="What's on your mind?"
              />



              <input
                type="file"
                className="form-inputs file-input"
                name="url"
                id="url"
                title="Upload an image"
                placeholder="upload an image"
                capture="camera"
                accept="image/*"
                onChange={
                  (e) => setSelectedFile(e.target.files[0])
                }
              />

            </div>
            <div className="button-container">
              <button
                className="edit-post-button"
                disabled={!!validationErrors.length}
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPostForm;
