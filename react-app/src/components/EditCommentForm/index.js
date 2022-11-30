import { useEffect, useState } from "react";
import { useHistory, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editComment, loadAllComments} from "../../store/comments"
import './EditCommentForm.css'


const EditCommentForm = ({commentId}) => {
    const dispatch= useDispatch()
    const history= useHistory()
    // const {commentId} = useParams

     useEffect(() => {
         dispatch(loadAllComments())
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
    // if (commentContent.length > 255){errors.push("Exceeded 255 character limit")}
    // if (!imageUrl) {setImageUrl(commentInfo.image_url)}

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
    <div className="Edit-Comment-Outer-Form-Container">
      <div className="EditComment-Inner-Form-Container">
        <form className="edit-comment-form" onSubmit={submitHandler}>
          <div className="edit-comment-form-title-box">
            <h1 className="edit-title-words">Edit Comment</h1>
          </div>
          <div className="edit-comment-form-user-name-container">{user.first_name} {user.last_name}</div>
          <div className="errors">
            {/* {validationErrors.length > 0 &&
              validationErrors.map((error) =>
                <div key={error}>{error}</div>
              )} */}
              {commentContent ? (
            <span className="charLeft">
              {commentContent.length}/255
            </span>
            ) : null}
          </div>

          <div className="edit-comment-form-container">
              <textarea
                className="form-inputs edit-comment"
                required
                type="text"
                minLength={1}
                maxLength={255}
                name="commentContent"
                onChange={(e) => setCommentContent(e.target.value)}
                value={commentContent}
                placeholder="Leave A Comment"
              />
          </div>
          <div className="button-container">
            <button className="edit-comment-button"
            disabled={!!validationErrors.length}
              type="submit">Save Comment</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );

}

export default EditCommentForm;
