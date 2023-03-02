import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpFormModal from './components/SignUpFormModal';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/Navigation/UsersList';
import User from './components/Navigation/User';
import * as sessionActions from "./store/session";
import PostsBrowser from './components/PostsBrowser'
import NewPostForm from './components/CreatePostForm';
import EditPostForm from './components/EditPostForm';
import LandingPage from './components/LandingPage'
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import UserProfilePage from './components/UserProfilePage';
import UploadPicture from './components/Images/UploadImages';


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
          <HomePage />
        </Route>

        <Route path='/users/:userId' exact={true}>
          <UserProfilePage />
        </Route>
        <Route path='/images'>
          <UploadPicture />
        </Route>
        <Route>
          404 Not Found
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>

        {/* <ProtectedRoute path='/users/profile/:userId exact= {true}'>
          <UserProfilePage />
        </ProtectedRoute> */}

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
