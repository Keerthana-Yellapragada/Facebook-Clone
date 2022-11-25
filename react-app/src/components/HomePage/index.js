import { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { createNewPost, loadAllPosts} from "../../store/posts"
import { loadAllComments } from "../../store/comments";
import PostsBrowser from "../PostsBrowser";
import NewPostForm from "../CreatePostForm";
import './HomePage.css'

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
            <h1 className="homepage-welcome-banner">Welcome to {user.first_name} {user.last_name}'s home page</h1>
            <NewPostForm />
            <PostsBrowser />

            </>
        )
}

export default HomePage;
