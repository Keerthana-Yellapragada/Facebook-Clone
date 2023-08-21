import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadOnePost, loadAllPosts, deletePost } from '../../store/posts';
import EditPostForm from '../EditPostForm';
import CommentsBrowser from '../CommentsBrowser';
import { loadAllComments } from '../../store/comments';
import './PostsBrowser.css'
import { Modal } from '../../context/Modal';
import EditPostFormModal from '../EditPostForm/EditPostFormModal';
import NewCommentForm from '../CreateComment';
import { createNewLike, loadPostLikes, loadAllLikes, removeLike } from '../../store/likes';
// import NotFoundImage from './NotFoundImage'

const PostsBrowser = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(loadAllPosts());
        dispatch(loadAllComments())
        dispatch(loadAllLikes())

    }, [dispatch])


    const allPosts = useSelector(state => Object.values(state.posts))

    let user = useSelector(state => state.session.user)

    let userPosts = allPosts?.filter(post => post.user_id === user?.id)

    const allLikes = useSelector(state => Object.values(state.likes))
    let allComments = useSelector((state) => Object.values(state.comments));

    // let filteredComments = allComments.filter(
    //     (comment) => comment.post_id === postId
    // );

    let likesCounter;


    const [visible, setVisible] = useState(false);
    // const [liked, setLiked] = useState(false)

    if (!allLikes) {
        return null
    }
    if (!allPosts) {
        return null
    }
    if (!user) {
        return null
    }
    if (!userPosts) {
        return null
    }

    if (!allComments) {
        return null
    }
    // if(!filteredComments){
    //     return null;
    // }


    const deleteHandler = async (postId) => {

        const payload = {
            id: postId
        }
        let deletedPost;
        deletedPost = dispatch(deletePost(payload)).then(() => dispatch(loadAllPosts())).then(() => history.push("/"))
    }


    let deleteButton;



    let likePayload;
    let createdLikePost
    let deleteLikePayload;
    let deletedPostLike;
    let currentPostLikes;
    let currentLike;
    let userLike;
    //    let likedButton;

    async function handleCreateLike(postId) {

        likePayload = {
            user_id: user?.id,
            post_id: postId,
            post_like: true,
            post_love: false
        }

        // setLiked(true)
        createdLikePost = await dispatch(createNewLike(likePayload)).then(() => dispatch(loadAllLikes())).then(() => history.push("/"))

    }

    async function handleRemoveLike(likeId) {
        if (likeId) {

            // setLiked(false)
            deletedPostLike = dispatch(removeLike(likeId)).then(() => dispatch(loadAllLikes())).then(() => history.push("/"))
        }
    }


    return (
        <>
            <div className='posts-browser-container'>
                <div className='posts-browser-cards-container'>
                    {allPosts?.slice(0).reverse().map(post => {

                        return (
                            <>
                                <div className='post-card-container'>
                                    <div className='post-user-info-header-container'>
                                        <div className='posts-browser-user-profile-pic-container'>
                                            <NavLink className="link-user-pic-name" to={`/users/${post.user.id}`}>
                                                <img
                                                    className='post-user-profile-pic'
                                                    src={post.user.profile_image} alt="user-profile-pics"

                                                />
                                                <div className='post-card-user-name'>{`${post.user.first_name} ${post.user.last_name}`}</div></NavLink >

                                        </div>

                                        {/* <div className='post-card-user-name'>{`${post.user.first_name} ${post.user.last_name}`}</div> */}

                                    </div>


                                    <div className='Main-Header-Edit-Delete-Button-container'>

                                        {user && user.id === post.user_id ?
                                            (deleteButton = (
                                                < div className="Edit-Delete-Button-container" >
                                                    <button className="Edit-Delete-Post-Button" onClick={() => deleteHandler(post.id)}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                    {
                                                        user && user.id === post.user_id ? < EditPostFormModal postId={post.id}
                                                        /> : null
                                                    }
                                                </div>
                                            )) :

                                            (deleteButton = (<></>))
                                        }

                                    </div>
                                    <div post-card-container>
                                        {/* <div className='post-card-title-container'>{post.user.first_name}</div> */}
                                        <div className='post-card-content-container'>
                                            {post.post_content}
                                        </div>

                                        <div className='post-image-main-container'>
                                            {post.image_url ?
                                                (
                                                    <div className='post-card-image-container'>
                                                        <img
                                                            className='post-pic'
                                                            src={post.image_url}
                                                            alt="image not found"
                                                            onError={
                                                                (e) => {
                                                                    e.currentTarget.src = "https://www.pngkit.com/png/detail/930-9306658_404-not-found.png";
                                                                }
                                                            }
                                                        />
                                                    </div>
                                                ) : null
                                            }
                                        </div>

                                        <div>
                                            {post?.likes?.length > 0 ?
                                                (likesCounter = <div id="likes-counter-pic-container">
                                                    <i id="likes-pic" className="fa-solid fa-thumbs-up" > </i> {post?.likes?.length}  </div>) : <></>
                                            }
                                        </div>
                                        <div className='post-likes-comments-number-container'>
                                            {/* {post?.likes?.length > 0 ?
                                                (likesCounter = < div id="likes-counter-pic-container" >
                                                    <i id="likes-pic" className="fa-solid fa-thumbs-up" > </i> {post?.likes?.length}  </div>) :<></>
                                            } */}
                                            <div className='likes-comments-counter-flex-container'>
                                                <div className='post-number-section'>{post?.likes?.length ? post.likes.length : 0} likes </div>
                                                {/* <div className='post-comments-number'>{post.comments.length? post.comments.length : 0} comments </div> */}
                                                <div className='post-number-section'>{allComments?.filter(comment => comment?.post_id === post?.id).length} comments</div>
                                            </div>


                                        </div>
                                        <div className='post-like-container'>

                                            <button className={userLike?.length > 0 ? 'liked-pic-button-container' : 'liked-post-button'}
                                                // id="liked-pic-button-container"

                                                onClick={() => {

                                                    currentPostLikes = allLikes.filter(like => like.post_id === post.id)
                                                    userLike = currentPostLikes.filter(like => like.user_id === user.id)


                                                    {
                                                        userLike?.length > 0 ? handleRemoveLike(userLike[0]?.id) : handleCreateLike(post.id)
                                                    }

                                                }
                                                }

                                            ><i class="fa-regular fa-thumbs-up"></i> Like</button>

                                            {/* <div>{allComments.filter(comment=> comment.post_id===post.id).length}</div> */}

                                        </div>




                                        <div className='leave-comment-container'>
                                            <NewCommentForm postId={post.id} />
                                        </div>


                                        <CommentsBrowser postId={post.id} />

                                        {/* {post.comments? (<div className='post-comment-container'>

                                     <CommentsBrowser postId={post.id} />

                                    </div>

                                    ) : null } */}


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

export default PostsBrowser;
