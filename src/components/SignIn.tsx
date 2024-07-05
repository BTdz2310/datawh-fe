import React, {useState} from 'react';
import '@/assets/styles/SignIn.css'
import axiosConfig from "@/axiosConfig";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/components/DataProvider";

const SignIn = () => {

    const [username, setUsername] = useState('');
    const {login} = useAuth()
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try{

            const response = await axiosConfig.post(`${process.env.REACT_APP_URL_BE||""}/auth/login`, {username: username}, {withCredentials: true})
            console.log(response)
            localStorage.setItem('accessToken', JSON.stringify(response.data.access_token));
            login();
            navigate('/')

        }catch(error: any){
            if (error.response&&error.response.data) {
                alert(`Lỗi: ${error.response.data.msg}`);
            } else {
                alert('Lỗi Không Xác Định.');
            }
        }
    }


    return (
        <div className='signin __container'>
            <form className="__content" onSubmit={(e)=>handleSubmit(e)}>
                <h1>Sign In</h1>
                <div className="__form">
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <button className="__button">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;