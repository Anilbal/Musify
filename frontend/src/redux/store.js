import { applyMiddleware, createStore } from "redux";
import reducerFunction from "./reduxReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";


const middleWare=[thunk]
const store=createStore(reducerFunction,composeWithDevTools(applyMiddleware(...middleWare)))
export default store