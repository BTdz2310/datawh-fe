import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Header from "@/components/Header";
import SignIn from "@/components/SignIn";
import {useAuth} from "@/components/DataProvider";

const Login = () => {

    const {isLoggedIn, loading} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn) navigate('/')
    }, []);

    return (
        <div>
            <Header />
            <SignIn />
        </div>
    );
};

export default Login;