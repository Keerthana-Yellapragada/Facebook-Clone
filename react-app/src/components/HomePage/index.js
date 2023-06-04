import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { createNewPost, loadAllPosts } from "../../store/posts"
import { loadAllComments } from "../../store/comments";
import { NavLink } from "react-router-dom";
import PostsBrowser from "../PostsBrowser";
import NewPostForm from "../CreatePostForm";
import './HomePage.css'
import NewPostFormModal from "../CreatePostForm/CreatePostModal";


function HomePage() {
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

                    <div className="author-bio-info-links-container">
                        <h2>Connect with the Author!</h2>

                        <img className="AppAcademyLogo" src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Appacademylogo.png"
                            alt="AppAcademyLogo" >
                        </img>


                        < a
                            href="https://www.linkedin.com/in/keerthana-yellapragada/"
                            target="_blank" >
                            <div className="author-bio-info-links">
                                <i class="fa-brands fa-linkedin fa-5x"></i>
                            </div>

                        </a>



                        <a href="https://github.com/Keerthana-Yellapragada" target="_blank">
                            < div className="author-bio-info-links" >
                                <i class="fa-brands fa-square-github fa-5x"></i >
                            </div>

                        </a>

                    </div>
                </div>


                <div className="homepage-center-container">

                    <div className="new-post-form-component-container">
                        <NewPostFormModal userName={user.first_name} />
                    </div>

                    <div className="posts-browser-component-container">
                        <PostsBrowser />
                    </div>
                </div>

                <div className="homepage-right-container">

                    <div className="ads-main-container">
                     < a href = "https://keerthana-yellapragada.github.io"
                     target = "_blank" > Keerthana's Portfolio</a>

                    < a href = " https://keerthana-final-airbnb-project.herokuapp.com/"
                    target = "_blank" > Keerbnb</a>

                    < a href = "https://codebunny.onrender.com/"
                    target = "_blank" > Codebunny</a>

                    </div>



                </div>

            </div>
        </>
    )
}

export default HomePage;
