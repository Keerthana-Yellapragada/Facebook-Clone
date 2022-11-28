import { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { createNewPost, loadAllPosts} from "../../store/posts"
import { loadAllComments } from "../../store/comments";
import PostsBrowser from "../PostsBrowser";
import NewPostForm from "../CreatePostForm";
import './HomePage.css'
import NewPostFormModal from "../CreatePostForm/CreatePostModal";

function HomePage(){
    const dispatch = useDispatch()
    const history = useHistory()

        useEffect(() => {
            dispatch(loadAllPosts());
            dispatch(loadAllComments())
        }, [dispatch])

        // select slice of state that we want
        const posts = useSelector(state => Object.values(state.posts))
        const user = useSelector(state => state.session.user)

        if (!user) {
            return null
        }
        if (!posts) {
            return null
        }


        return (
            <>
        <div className="homepage-container">
            < div className = "homepage-welcome-banner-container" >

                 <div className='home-page-user-profile-pic-container'>
                                    <img
                                        src="data:image/jpeg;base64,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"
                                        alt="user-profile-pics"
                                    />
                 </div>
                 <h1 className="homepage-welcome-banner">Welcome to {user.first_name} {user.last_name}'s home page</h1>

            </div>

                <div className="new-post-form-component-container">
                    <NewPostFormModal userName={user.first_name} />
                </div>

                <div className="posts-browser-component-container">
                        <PostsBrowser />
                </div>
            </div>
            </>
        )
}

export default HomePage;
