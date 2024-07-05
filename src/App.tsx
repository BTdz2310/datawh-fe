import React, {useEffect} from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes, useLocation
} from 'react-router-dom';
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import axiosConfig from "./axiosConfig";
import Loading from "@/components/Loading";
import DataProvider from "@/components/DataProvider";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/scss/_variables.scss';
// import "/node_modules/bootstrap/scss/root";

function App() {

    return (
        <DataProvider>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/signin' element={<Login />} />
                        <Route path='/profile' element={<Profile />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </DataProvider>
    );
}

export default App;
