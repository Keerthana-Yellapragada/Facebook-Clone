import { useEffect, useState } from "react";
import { useHistory, useParams, useDispatch} from "react-router-dom";
import { editComment, loadAllComments} from "../../store/comments"

const EditPostForm = ({commentId}) => {
    const dispatch= useDispatch()
    const history= useHistory()
    // const {postId} = useParams

     useEffect(() => {
         dispatch(loadAllPosts())
         //   .then(() => setIsLoaded(true))
     }, [dispatch])



    // select slice of state that we want
    const comments = useSelector(state=> Object.values(state.comments))
    const user = useSelector(state => state.session.user)
    const commentInfo = useSelector(state => state.comments[commentId])

    // states
    // const [isLoaded, setIsLoaded] = useState(false)
    const [commentContent, setCommentContent] = useState(commentInfo.comment_content)
    // const [imageUrl, setImageUrl] = useState('')
    const [validationErrors, setValidationErrors] = useState([])


    if (!user){
        return null
    }
    if (!comments) {
        return null
    }
    if (!commentInfo){
        return null
    }


const submitHandler = async (e) => {
    e.preventDefault()
    const errors = []

    if (!commentContent) {errors.push("Cannot leave field empty")};
    // if (!imageUrl) {setImageUrl(postInfo.image_url)}

    setValidationErrors(errors)

    if (!validationErrors.length) {
        const editedCommentPayload = {
            id: commentInfo.id,
            comment_content: commentContent
            // ,image_url: imageUrl
        }

        const editedComment = await dispatch(editComment(editedCommentPayload))
        history.push(`/`)
    }
}


  return (
<>
    <div className="Outer-Form-Container">
      <div className="Inner-Form-Container">
        <form className="create-post-form" onSubmit={submitHandler}>
          <div className="create-post-form-title-box">
            <h1 className="title-words">Edit Comment</h1>
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
                name="commentContent"
                onChange={(e) => setCommentContent(e.target.value)}
                value={commentContent}
                placeholder="What's on your mind?"
              />


            {/* <label for="upload-picture-button"> Upload an Image file</label> */}
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
    </>
  );

}

export default EditPostForm;