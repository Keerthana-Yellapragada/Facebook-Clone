import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { createNewPost, loadAllPosts } from "../../store/posts"
import { loadAllComments } from "../../store/comments";
import { NavLink, Link } from "react-router-dom";
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

                        <h3>Education</h3>

                        <div className="left-section-content logo-container">

                            <img className="AppAcademyLogo" src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Appacademylogo.png"
                                alt="AppAcademyLogo" />
                        </div>

                        <h3>Socials</h3>
                        <div className="left-section-content">

                            <a
                                href="https://www.linkedin.com/in/keerthana-yellapragada/"
                                target="_blank" >
                                <div className="author-bio-info-links">
                                    <i class="fa-brands fa-linkedin fa-5x"></i>
                                </div>

                            </a>
                        </div>


                        <div className="left-section-content">

                            <a href="https://github.com/Keerthana-Yellapragada" target="_blank">
                                < div className="author-bio-info-links" >

                                    <i class="fa-brands fa-square-github fa-5x"></i >

                                </div>

                            </a>
                        </div>

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

                        <div className="ad-card">
                            {/* <Link to={{ pathname: "https://keerthana-yellapragada.github.io" }} target="_blank">
                                <div className="ad-content" > Want to learn more about the author? </div>
                                <div className="ad-content small" > Keerthana is a full-stack software developer and dentist based in the SF Bay Area </div>
                                <div className="ad-content bold" > Check out Keerthana's Portfolio</div>

                            </Link> */}


                            <a href="https://keerthana-yellapragada.github.io"
                                target="_blank" >
                                <div className="ad-content" > Want to learn more about the author? </div>
                                <div className="ad-content small" > Keerthana is a full-stack software engineer and dentist based in the SF Bay Area </div>
                                <div className="ad-content bold" > Check out Keerthana's Portfolio</div>
                            </a>
                        </div>


                        <div className="ad-card">
                            {/* <Link to={{ pathname: "https://keerthana-final-airbnb-project.herokuapp.com/" }} target="_blank"> */}
                            <a href=" https://keerthana-final-airbnb-project.herokuapp.com/"
                                target="_blank" >
                                <div className="ad-content">Looking for your next getaway?</div>
                                <div className="ad-content small">New summer discounts on vacation rentals!</div>
                                <div className="ad-content bold"> Find a place to stay at Keerbnb </div>
                            </a>

                            {/* </Link> */}
                        </div>


                        <div className="ad-card">
                            <a className="ad-content"
                                href="https://codebunny.onrender.com/"
                                target="_blank" >
                                {/* <Link to={{ pathname: "https://codebunny.onrender.com/" }} target="_blank"> */}

                                <div className="ad-content"> Looking to hire someone for your next software project?</div>
                                <div className="ad-content small"> Hire a coder for just $25/hour!</div>
                                <div className="ad-content small"> Experts available in various programming languages of your choice! </div>
                                <div className="ad-content bold">Try Codebunny Today</div>
                            </a>
                            {/* </Link> */}
                        </div>

                    </div>



                </div>

            </div >
        </>
    )
}

export default HomePage;
