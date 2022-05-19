import axios from "axios";
import React, { useEffect } from "react";
import {Routes, Route} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";


//components
import Navbar from './components/navbar'
import Footer from './components/footer'
import Loading from "./components/loading";

//pages
import Start from "./pages/start";
import Home from '../src/pages/home'
import Profile from "./pages/profile";
import Verification from "./pages/verification";
import ResendToken from "./pages/resend-token";
import ResetPassword from "./pages/reset-password";

import { GET_USER_DATA } from "./redux/actions/types";

function Main () {
    const API_URL = process.env.REACT_APP_API_URL
    const loading = useSelector((state) => state.loading.loading)
    console.log(`loading at MainApp:`, loading);
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    
    return (
        token ?
        <div>
            <Routes>
                <Route path="/home" element={<Navbar/>}/>
                <Route path="/profile" element={<Navbar/>}/>
                <Route path="/post" element={<Navbar/>}/>
                <Route path="/friend" element={<Navbar/>}/>
            </Routes>
            <Loading onLoading={loading}/>
            <Routes>
                <Route path='/' element={<Start/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
            <Routes>
                <Route path="/home" element={<Footer/>}/>
                <Route path="/profile" element={<Footer/>}/>
                <Route path="/post" element={<Footer/>}/>
                <Route path="/friend" element={<Footer/>}/>
            </Routes>
        </div>
        :
        <div>
            <Loading onLoading={loading}/>
            <Routes>
                <Route path='/resend/:token' element={<ResendToken/>} />
                <Route path='/verify/:token/verify/:userId' element={<Verification />} />
                <Route path='/' element={<Start/>}/>
                <Route path='/reset/:userId/reset/:email' element={<ResetPassword/>} />
            </Routes>
        </div>
    )
}

export default Main