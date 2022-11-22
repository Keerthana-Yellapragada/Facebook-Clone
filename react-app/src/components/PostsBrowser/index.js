import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadOnePost, loadAllPosts, deletePost } from '../../store/posts';



const PostsBrowser = () => {
    const dispatch = useDispatch()
    // const history = useHistory()
    useEffect(()=>{
        dispatch(loadAllPosts());
    },[dispatch])

    const allPosts = useSelector(state => Object.values(state.posts))
    console.log("ALLPOSTS", allPosts)
    let user = useSelector(state => state.session.user)
    console.log("user", user)
    let userPosts = allPosts.filter(post => post.user_id === user.id)
    console.log("USERPOSTS". userPosts)

    if (!allPosts){
        return null
    }
    if (!user) {
        return null
    }
    if (!userPosts){
        return null
    }


console.log("THIS IS USER INFO", user)

return (
<>
    <div className='posts-browser-container'>
        <div className='posts-browser-cards-container'>
            {userPosts?.map(post => {
                return (
                <>
                <h1>{`${user.first_name} ${user.last_name}'s home page`}</h1>
                    <div post-card-container>
                        <div className='post-card-title-container'>{post.user.name}</div>
                        <div className='post-card-content-container'>
                            {post.post_content}
                        </div>
                        {post.image_url ?
                        (
                            <div className='post-card-image-container'>
                                <img
                                src={ post.image_url}
                                alt="image description for screen readers"
                                onError = {
                                    (e) => {
                                        e.currentTarget.src = "https://www.pngkit.com/png/detail/930-9306658_404-not-found.png";
                                    }
                                }
                                />
                            </div>
                        ) : null
                        }
                        {/* <div className='post-comment-container'>{post.comments? <CommentsBrowser />: null }</div> */}
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
