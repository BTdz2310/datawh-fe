import React from 'react';
import heroImg from '@/assets/images/heroImg.png'
import '@/assets/styles/Hero.css'

const Hero = () => {
    return (
        <div className='hero __container'>
            <div className="__content">
                <div className="hero__first">
                    <h1>
                        Save your data storage here.
                    </h1>
                </div>
                <div className="hero__second">
                    <div className="second__left">
                        <p>Data Warehouse is a data storage area that has been
                            tested for security, so you can store your data here
                            safely but not be afraid of being stolen by others.</p>
                        <button className='__button'>Learn more</button>
                    </div>
                    <div className="second__right">
                        <img src={heroImg} alt="hero-img"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;