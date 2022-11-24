import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpFormModal from './components/SignUpFormModal';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import * as sessionActions from "./store/session";
import PostsBrowser from './components/PostsBrowser'
import NewPostForm from './components/CreatePostForm';
import EditPostForm from './components/EditPostForm';
import LandingPage from './components/LandingPage'

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async() => {
        await dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
      setIsLoaded(true);
    })();
  }, [dispatch]);

  if (!isLoaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <LandingPage />
        </Route>
        <Route path='/homepage' exact={true}>
          <NewPostForm />
          <PostsBrowser />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>



      </Switch>
    </BrowserRouter>
  );
}

export default App;
