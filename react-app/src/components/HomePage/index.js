import { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { createNewPost, loadAllPosts} from "../../store/posts"
import { loadAllComments } from "../../store/comments";
import { NavLink } from "react-router-dom";
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
            <div className="homepage-left-container">

            < a href = "https://www.linkedin.com/in/keerthana-yellapragada/"
            target = "_blank" ><i class="fa-brands fa-linkedin"></i> </a>
            < a href = "https://github.com/Keerthana-Yellapragada" target="_blank"><i class="fa-brands fa-square-github"></i></a>
            </div>


            <div className="homepage-center-container">

                <div className="new-post-form-component-container">
                    <NewPostFormModal userName={user.first_name} />
                </div>

                <div className="posts-browser-component-container">
                        <PostsBrowser />
                </div>
            </div>

            <div className="homepage-right-container"></div>

            </div>
            </>
        )
}

export default HomePage;
