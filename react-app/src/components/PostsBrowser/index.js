import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadOnePost, loadAllPosts, deletePost } from '../../store/posts';



const Posts = () => {
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(()=>{
        dispatch(loadAllPosts());
    },[dispatch])

    const allPosts = useSelector(state => Object.values(state.posts))
    let user = useSelector(state => state.session.user)
    let userPosts = allPosts.filter(post => post.user_id === user.id)

    if (!allPosts){
        return null
    }
    if (!user) {
        return null
    }
    if (!userPosts){
        return null
    }
}

console.log("THIS IS USER INFO", user)

return (
    <>
    </>
)
