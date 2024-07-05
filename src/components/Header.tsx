import React from 'react';
import {Link, useLocation} from "react-router-dom";
import logo from '@/assets/images/logo.png'
import '@/assets/styles/Header.css'
import {useAuth} from "@/components/DataProvider";

const Header = () => {

    const {pathname} = useLocation();
    const {isLoggedIn, logout} = useAuth();

    return (
        <header className='__container'>
            <div className="__content">
                <div className="header__left">
                    <Link to={'/'}><img src={logo} alt="logo"/></Link>
                </div>
                <div className="header__right">
                    {!pathname.includes('signin')&&(
                        <>
                            {!isLoggedIn?(<Link to='/signin' className='__button'>Sign In</Link>):(
                                <>
                                    <Link to='/profile' className='__button'>Profile</Link>
                                    <button className='__button' onClick={logout}>Logout</button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;