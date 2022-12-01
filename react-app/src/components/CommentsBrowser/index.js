import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import {
  loadOneComment,
  loadAllComments,
  createComment,
  editComment,
  deleteComment,
} from "../../store/comments";
import { loadAllPosts } from "../../store/posts";
import EditCommentFormModal from "../EditCommentForm/EditCommentModal";
import "./CommentsBrowser.css";

const CommentsBrowser = ({ postId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const {postId} = useParams()

  useEffect(() => {
    dispatch(loadAllPosts());
    dispatch(loadAllComments());
  }, [dispatch]);

  const allPosts = useSelector((state) => Object.values(state.posts));
  console.log("ALLPOSTS", allPosts);

  const currentPost = allPosts.filter((post) => post.id === postId);
  console.log("currentPOSTS", currentPost);
  let user = useSelector((state) => state.session.user);
  // console.log("user", user)
  let userPosts = allPosts?.filter((post) => post.user_id === user?.id);
  console.log("USERPOSTS", userPosts);

  let allComments = useSelector((state) => Object.values(state.comments));
  console.log("ALLCOMMENTs", allComments);

  let filteredComments = allComments.filter(
    (comment) => comment.post_id === postId
  );
  console.log("filtered comments", filteredComments);

  if (!allPosts) {
    return null;
  }
  if (!currentPost) {
    return null;
  }
  if (!user) {
    return null;
  }
  if (!userPosts) {
    return null;
  }
  if (!allComments) {
    return null;
  }
  if (!filteredComments) {
    return null;
  }

  console.log("THIS IS USER INFO", user);

  const deleteHandler = async (commentId) => {
    const payload = {
      id: commentId,
    };
    let deletedComment;
    deletedComment = await dispatch(deleteComment(payload))
      .then(() => dispatch(loadAllComments()))
      .then(() => history.push("/homepage"));
  };

  let deleteButton;

  return (
    <>
      <div className="comments-browser-container">
        <div className="post-number-of-comments">{filteredComments.length} {filteredComments.length === 1? "comment" : "comments"}</div>
        <div className="comments-browser-cards-container">
          {filteredComments?.map((comment) => {
            return (
              <>
                <div className="comment-card-main-container">
                <div className="comment-card-header-info">
                    < img
                    className = 'comment-card-user-pic'
                    src = "data:image/jpeg;base64,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"
                    alt = "user-profile-pics" /
                      >

                  <div className="comment-title">{`${comment.user.first_name} ${comment.user.last_name}`}</div>
                  </div>
                  <div comment-card-container>
                    <div className="comment-info-top-container">
                      {/* <div className='comment-card-title-container'>{comment.user.first_name}</div> */}
                      <div className="comment-card-content-container">
                        {comment.comment_content}
                      </div>
                    </div>

                    <div>

                    </div>
                    </div>
                    {user && user.id === comment.user_id
                      ? (deleteButton = (
                          <div className="Edit-Delete-Button-container">
                            <button
                              className="Edit-Delete-Post-Button"
                              onClick={() => deleteHandler(comment.id)}
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                            {user && user.id === comment.user_id ? (
                              <EditCommentFormModal className="edit-comment-modal" commentId={comment.id} />
                            ) : null}
                          </div>
                        ))
                      : (deleteButton = <></>)}

                    {/* <div className='post-comment-container'>{post.comments? <CommentsBrowser />: null }</div> */}

                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CommentsBrowser;
