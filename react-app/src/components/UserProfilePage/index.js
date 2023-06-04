import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadOnePost, loadAllPosts, deletePost } from '../../store/posts';
import EditPostForm from '../EditPostForm';
import CommentsBrowser from '../CommentsBrowser';
import { loadAllComments } from '../../store/comments';
import './UserProfilePage.css'
import { Modal } from '../../context/Modal';
import EditPostFormModal from '../EditPostForm/EditPostFormModal';
import NewCommentForm from '../CreateComment';
import { createNewLike, loadPostLikes, loadAllLikes, removeLike } from '../../store/likes';
import { loadAllUsers, loadOneUser } from '../../store/users';
import { createNewFriendship, deleteFriendship, loadAllFriendships, updateFriendship } from '../../store/friendships';


// *********************************************************************************************************************

const UserProfilePage = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    let { userId } = useParams()
    userId = parseInt(userId)


    useEffect(() => {
        dispatch(loadAllPosts());
        dispatch(loadAllComments())
        dispatch(loadAllLikes())
        dispatch(loadAllUsers())
        dispatch(loadAllFriendships())

    }, [dispatch])

    // *********************************************************************************************************************

    const allPosts = useSelector(state => Object.values(state?.posts))

    let users = useSelector(state => state?.users)

    let sessionUser = useSelector(state => state?.session?.user)
    let sessionUserId = sessionUser?.id
    console.log("sessionuserId", sessionUserId)

    // let user = users?.filter(user => user.id === userId)
    // user = user[0]
    let user = users[userId]

    let userPosts = allPosts?.filter(post => post?.user_id === user?.id)


    const allLikes = useSelector(state => Object.values(state?.likes))

    let allFriendships = useSelector(state => Object.values(state.friendships))

    let friend_request_approvals = allFriendships.filter(friendship => friendship.to_uid === userId && friendship.is_approved == 0)

    let allFriends = allFriendships.filter(friendship => ((friendship.to_uid === userId || friendship.from_uid === userId) && friendship.is_approved == 1))
    console.log("ALLFRIENDS", allFriends)

    let currFriendship = allFriends.filter(friendship => ((friendship.to_uid === sessionUser.id || friendship.from_uid === sessionUser.id) && (friendship.from_uid === userId || friendship.to_uid === userId) && friendship.is_approved == 1))
    console.log("curr friendship is!!!!!!!!!!!", currFriendship)
    // *********************************************************************************************************************

    const [visible, setVisible] = useState(false);

    // *********************************************************************************************************************
    if (!users) {
        return null
    }
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

    if (!allFriends) {
        return null
    }
    if (!sessionUser) {
        return null
    }

    if (!sessionUserId){
        return null
    }
    // *********************************************************************************************************************
    const deleteHandler = async (postId) => {

        const payload = {
            id: postId
        }
        let deletedPost;
        deletedPost = dispatch(deletePost(payload)).then(() => dispatch(loadAllPosts())).then(() => history.push(`/users/${sessionUser.id}/`))
    }

    // *********************************************************************************************************************
    let deleteButton;
    let likePayload;
    let createdLikePost
    let deleteLikePayload;
    let deletedPostLike;
    let currentPostLikes;
    let currentLike;
    let userLike;


    // *********************************************************************************************************************

    async function handleCreateLike(postId) {

        likePayload = {
            user_id: user?.id,
            post_id: postId,
            post_like: true,
            post_love: false
        }
        // likedButton=true
        createdLikePost = await dispatch(createNewLike(likePayload)).then(() => dispatch(loadAllLikes())).then(() => history.push(`/users/${sessionUser.id}/`))

    }
    // *********************************************************************************************************************

    async function handleRemoveLike(likeId) {
        if (likeId) {
            // likedButton=false
            deletedPostLike = dispatch(removeLike(likeId)).then(() => dispatch(loadAllLikes())).then(() => history.push(`/users/${sessionUser.id}/`))
        }
    }
    // *********************************************************************************************************************

    async function handleAddFriend() {

        let friendshipPayload = {
            from_uid: sessionUser.id,
            to_uid: user.id,
            is_approved: 0
        }
        let newFriendship = dispatch(createNewFriendship(friendshipPayload)).then(() => dispatch(loadAllFriendships())).then(() => history.push(`/homepage`))

    }
// *********************************************************************************************************************

    async function handleRemoveFriend (){

        console.log("CURR FRIENDSHIP ID IS", currFriendship.id)
        let friendshipPayload = {
           id: currFriendship.id,
           from_id : currFriendship.from_id,
           to_uid: currFriendship.to_uid,
           is_approved: 0

        }
        let deletedFriendship = dispatch(deleteFriendship(friendshipPayload)).then(() => dispatch(loadAllFriendships())).then(() => history.push(`/users/${userId}`))
    }

// *********************************************************************************************************************


    // *********************************************************************************************************************

    async function handleAcceptRequest(request) {
        console.log(" pre accept FRIEND REQ", request)
        let acceptPayload = {
            id: request.id,
            from_uid: request.from_uid,
            to_uid: request.to_uid,
            is_approved: 1

        }
        let acceptedRequest = dispatch(updateFriendship(acceptPayload)).then(() => dispatch(loadAllFriendships())).then(() => history.push(`/users/${sessionUser.id}`))


    }



    // *********************************************************************************************************************

    async function handleIgnoreRequest(request) {
        console.log("ignore FRIEND REQ", request)
        let deletedFriendship = dispatch(deleteFriendship(request)).then(() => history.push(`/users/${sessionUser.id}/`))

    }



    // *********************************************************************************************************************

    // debugger
    return (
        <>
            <div className='user-profile-page-main-container'>
                {<div className='profile-page-cover-photo-container'>
                    {/* <img className = "profile-page-cover-photo" src = 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.6435-9/181875375_10159297272459182_3625930985193864242_n.jpg?stp=dst-jpg_p960x960&_nc_cat=105&ccb=1-7&_nc_sid=e3f864&_nc_ohc=kg6Af9LRHDMAX_3VopU&tn=WDhmvm_IPZtUReKg&_nc_ht=scontent-sjc3-1.xx&oh=00_AfCZwmhSWKd3NfGNHvYnXJojAabqk4P_Hd4sk-40k3tFdw&oe=63B5AA2A'
        alt = 'cover-photo' /> */}
                </div>}
                <div className='user-profile-header-container'>
                    <img
                        className='profile-user-profile-pic'
                        src="data:image/jpeg;base64,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"
                        alt="user-profile-pics"
                    />
                    <div className="profile-header-user-name">{user.first_name} {user.last_name}</div>

                    {
                        sessionUser && sessionUser.id === userId ? null :

                            (<div className='profile-user-header-buttons'>
                                {currFriendship.length > 0 ?
                                <button onClick={handleRemoveFriend} className='add-friend-button'><i class="fas fa-user-times"></i>Remove Friend</button>
                                    :
                                    <button onClick={handleAddFriend} className='add-friend-button'><i class="fa-solid fa-user-plus"></i>Add Friend</button>}
                            </div>)





                            }

                </div>


                <div className='user-profile-page-flex-container'>
                    <div className='left-user-info-flex-container'>
                        <div className='user-info-main-container'>
                            <div className='user-intro-title'>Intro</div>
                            <div>{user?.first_name} {user?.last_name}</div>
                            <div>Contact: {user?.email}</div>
                        </div>

                        <div className='right-user-friends-container'>
                            <div className='Friends-container-title'>Friends</div>
                            {sessionUser && sessionUser.id === userId ?
                                (
                                    <>
                                        {/* {friend_request_approvals.length > 0 ? <div className='pending-request-container'>Requests:</div> : null} */}
                                        <div className='friend-request-container'>



                                            {sessionUser && sessionUser.id === userId ? friend_request_approvals.map(request => {
                                                return (
                                                    <>

                                                        <div className="friend-request-name">{users[request?.from_uid]?.first_name} {users[request?.from_uid]?.last_name}</div>
                                                        <div className="friend-request"> wants to add you as a friend </div>
                                                        <div>
                                                            <button className="friend-request-button" onClick={() => handleAcceptRequest(request)}>Accept</button>
                                                            <button className="friend-request-button" onClick={() => handleIgnoreRequest(request)}>Ignore</button>
                                                        </div>
                                                    </>
                                                )
                                            }) : (<h3>No New Friend Requests!</h3>)}

                                        </div>

                                    </>
                                ) : null}
                            <div className='friends-main-flex-container'>
                                {allFriends.length > 0 ? (
                                    <>
                                        <div className='friends-container'>

                                            {allFriends?.map(friend => {
                                                return (
                                                    <>
                                                        <div className="friend-card-container">{friend.to_uid != sessionUser.id ? (
                                                            <>
                                                                <div className='friend-card'>
                                                                    <NavLink to={`/users/${friend.from_id}/`}>

                                                                        <div className="friend-profile-pic-container">
                                                                            <img
                                                                                className='friend-profile-pic'
                                                                                src="data:image/jpeg;base64,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"
                                                                                alt="user-profile-pics"
                                                                            />
                                                                        </div>


                                                                    </NavLink>
                                                                    <div className='friend-first-name'>{users[friend?.to_uid]?.first_name}</div>
                                                                    <div className='friend-last-name'>{users[friend?.to_uid]?.last_name}</div>
                                                                </div>
                                                            </>
                                                        ) :

                                                            (

                                                                <>
                                                                    <div className='friend-card'>
                                                                        <NavLink to={`/users/${friend.from_id}`}>

                                                                            <div className="friend-profile-pic-container">
                                                                                <img
                                                                                    className='friend-profile-pic'
                                                                                    src="data:image/jpeg;base64,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"
                                                                                    alt="user-profile-pics"
                                                                                />
                                                                            </div>


                                                                        </NavLink>
                                                                        <div className='friend-first-name'>{users[friend?.from_uid]?.first_name}</div>
                                                                        <div className='friend-last-name'>{users[friend?.from_uid]?.last_name}</div>
                                                                    </div>
                                                                </>

                                                            )

                                                        }
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>





                                    </>) : null}
                            </div>
                        </div>


                    </div>
                    <div className='center-user-posts-browser-container'>
                        <>
                            <div className='posts-browser-container'>
                                <div className='posts-browser-cards-container'>
                                    {userPosts?.slice(0).reverse().map(post => {

                                        return (
                                            <>
                                                <div className='post-card-container'>
                                                    <div className='post-user-info-header-container'>
                                                        <div className='posts-browser-user-profile-pic-container'>
                                                            <img
                                                                className='post-user-profile-pic'
                                                                src="data:image/jpeg;base64,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"
                                                                alt="user-profile-pics"
                                                            />

                                                        </div>

                                                        <div className='post-card-user-name'>{`${post?.user?.first_name} ${post?.user?.last_name}`}</div>

                                                    </div>


                                                    <div className='Main-Header-Edit-Delete-Button-container'>

                                                        {user && user?.id === post?.user_id ?
                                                            (deleteButton = (
                                                                < div className="Edit-Delete-Button-container" >
                                                                    <button className="Edit-Delete-Post-Button" onClick={() => deleteHandler(post?.id)}>
                                                                        <i className="fa-solid fa-trash-can"></i>
                                                                    </button>
                                                                    {
                                                                        user && user?.id === post?.user_id ? < EditPostFormModal postId={post?.id}
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
                                                            {post?.post_content}
                                                        </div>

                                                        <div className='post-image-main-container'>
                                                            {post?.image_url ?
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
                                                        <div className='post-likes-comments-number-container'>

                                                            <div className='post-likes-number'>{post?.likes?.length ? post.likes.length : 0} likes </div>
                                                            {/* <div className='post-comments-number'>{post.comments.length? post.comments.length : 0} comments </div> */}
                                                        </div>
                                                        <div>

                                                            <button className='liked-post-button'
                                                                onClick={() => {

                                                                    currentPostLikes = allLikes.filter(like => like.post_id === post.id)
                                                                    userLike = currentPostLikes.filter(like => like.user_id === user.id)

                                                                    {
                                                                        userLike?.length > 0 ? handleRemoveLike(userLike[0]?.id) : handleCreateLike(post.id)
                                                                    }
                                                                }
                                                                }

                                                            ><i class="fa-regular fa-thumbs-up"></i> Like</button>

                                                        </div>


                                                        <div className='leave-comment-container'>
                                                            <NewCommentForm postId={post.id} />
                                                        </div>


                                                        <CommentsBrowser postId={post.id} />


                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>

                        </>
                    </div>

                </div>
            </div>
        </>
    )

}


// *********************************************************************************************************************

export default UserProfilePage;
