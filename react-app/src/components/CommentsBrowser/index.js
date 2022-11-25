import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadOneComment,loadAllComments, createComment, editComment, deleteComment } from '../../store/comments';
import { loadAllPosts } from '../../store/posts';
import EditCommentFormModal from '../EditCommentForm/EditCommentModal';
import "./CommentsBrowser.css"

const CommentsBrowser = ({postId}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    // const {postId} = useParams()

    useEffect(() => {
        dispatch(loadAllPosts());
        dispatch(loadAllComments())
    }, [dispatch])

    const allPosts = useSelector(state => Object.values(state.posts))
    console.log("ALLPOSTS", allPosts)

    const currentPost = allPosts.filter(post=> post.id === postId)
    console.log("currentPOSTS", currentPost
    )
    let user = useSelector(state => state.session.user)
    // console.log("user", user)
    let userPosts = allPosts?.filter(post => post.user_id === user?.id)
    console.log("USERPOSTS",userPosts)

    let allComments = useSelector(state => Object.values(state.comments))
    console.log("ALLCOMMENTs", allComments)

    let filteredComments = allComments.filter(comment => comment.post_id === postId)
    console.log("filtered comments", filteredComments)

    if (!allPosts) {
        return null
    }
    if (!currentPost){
        return null
    }
    if (!user) {
        return null
    }
    if (!userPosts) {
        return null
    }
    if (!allComments){
        return null
    }
    if (!filteredComments){
        return null
    }

    console.log("THIS IS USER INFO", user)

    const deleteHandler = async (commentId) => {

        const payload = {
            id: commentId
        }
        let deletedComment;
        deletedComment = await dispatch(deleteComment(payload)).then(() => dispatch(loadAllComments())).then(() => history.push("/homepage"))
    }


    let deleteButton;


    return (
        <>
            <div className='comments-browser-container'>
                {/* <h3>COMMENTS BROWSER</h3> */}
                <div className='comments-browser-cards-container'>
                    {filteredComments?.map(comment => {
                        return (
                            <>
                                <div className='comment-card-main-container'>

                                <div className='comment-title'>{`${comment.user.first_name} ${comment.user.last_name}`}</div>
                                <div comment-card-container>
                                <div className='comment-info-top-container'>
                                    {/* <div className='comment-card-title-container'>{comment.user.first_name}</div> */}
                                    <div className='comment-card-content-container'>
                                        {comment.comment_content}
                                    </div>
                                </div>

                                    <div>
                                     {/* {   <EditCommentForm commentId={comment.id}/>} */}

                                        {/* {user && user.id === comment.user_id ?
                                        ( deleteButton = (
                                                < div className="Edit-Delete-Comment-Button-container" >
                                                    <button className="Edit-Delete-Comment-Button" onClick={() => deleteHandler(comment.id)}>Remove Comment</button>
                                                </div>
                                            )) :

                                        ( deleteButton = (<></>))
                                        } */}

                                    </div>


                                        {user && user.id === comment.user_id ?
                                        ( deleteButton = (
                                                < div className="Edit-Delete-Button-container" >
                                                    <button className="Edit-Delete-Post-Button" onClick={() => deleteHandler(comment.id)}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                     {
                                                         user && user.id === comment.user_id ? < EditCommentFormModal commentId = {comment.id}
                                                         /> : null
                                                     }
                                                </div>
                                            )) :

                                        ( deleteButton = (<></>))
                                        }












                                    {/* <div className='post-comment-container'>{post.comments? <CommentsBrowser />: null }</div> */}
                                </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )

}

export default CommentsBrowser;
