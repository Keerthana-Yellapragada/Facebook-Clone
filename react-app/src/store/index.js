import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import commentReducer from './comments';
import friendshipReducer from './friendships';
import likesReducer from './likes';
import postReducer from './posts';
import session from './session'
import userReducer from './users';

const rootReducer = combineReducers({
  session: session,
  posts: postReducer,
  comments: commentReducer,
  likes: likesReducer,
  friendships: friendshipReducer,
  users: userReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
