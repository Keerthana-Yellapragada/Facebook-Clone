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
  const [imageUrl, setImageUrl] = useState(postInfo.image_url);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    dispatch(loadAllPosts());
  }, [dispatch]);

  useEffect(() => {
    const errors = [];

    const validUrls = ["img", "jpg", "jpeg", "png"];
    let urlArray = imageUrl.split(".");
    let urlExtension = urlArray[urlArray.length - 1];

    if (imageUrl && !validUrls.includes(urlExtension)) {
      errors.push("Please enter an image in .png, .jpg, .jpeg, or .img format");
    }
    if (postContent & (postContent.length < 1)) setValidationErrors(errors);
  }, [postContent, imageUrl]);

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
    if (!imageUrl) {
      setImageUrl(postInfo.image_url);
    }

    setValidationErrors(errors);

    if (!validationErrors.length) {
      const editedPostPayload = {
        id: postInfo.id,
        post_content: postContent,
        image_url: imageUrl,
      };

      const editedPost = await dispatch(editPost(editedPostPayload));
      history.push(`/`);
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
            </div>
            <div className="create-post-form-container">
              <input
                className="form-inputs form-text-input-field"
                required
                type="text"
                name="postContent"
                onChange={(e) => setPostContent(e.target.value)}
                value={postContent}
                placeholder="What's on your mind?"
              />

              {/* <label for="upload-picture-button"> Upload an Image file</label> */}
              {/* <input
              className="form-inputs"
              type="file"
              id = "upload-picture-button"
              name = "imageUrl"
              placeholder=""
              accept="image/png, image/jpeg, image/jpg, image/*"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
                /> */}
              {/* <label for="upload-picture-button">
                Choose A Photo
                <i class="fas fa-upload"></i>
               </label> */}

              <input
                type="url"
                className="form-inputs"
                name="url"
                id="url"
                placeholder="Enter an https:// URL  : https://example.com"
                pattern="https://.*"
                size="30"
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
              />
            </div>
            <div className="button-container">
              <button
                className="edit-post-button"
                disabled={validationErrors.length > 0}
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
