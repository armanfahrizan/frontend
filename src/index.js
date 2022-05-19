import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

//import main app
import Main from "./main";

//config redux -> import reducer
import userReducer from './redux/reducer/user-reducers'
import postReducer from './redux/reducer/post-reducers'
import friendReducer from './redux/reducer/friend-reducers'
import loadingReducer from './redux/reducer/loading-reducers'

//create combine reducer
const Reducer = combineReducers({
    user : userReducer,
    posts : postReducer,
    friends : friendReducer,
    loading : loadingReducer
})

//create global store
const store = createStore(Reducer)


ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <Provider store = {store}>
        <Main />
      </Provider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
