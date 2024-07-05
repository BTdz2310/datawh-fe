import React from 'react';
import logo from '@/assets/images/logo.png'
import '@/assets/styles/Footer.css'

const Footer = () => {
    return (
        <footer className='footer __container'>
            <div className="__content">
                <div className="footer__info">
                    <div className="footer__item">
                        <div className="footer__item--first">
                            <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                                <img src={logo} alt="logo" className='footer__logo'/>
                                <p className='footer__title'>DataWarehouse</p>
                            </div>
                            <div>
                                <p style={{fontFamily: 'Avenir', fontWeight: '500', fontSize: '16px', color: '#212353'}}>Warehouse Society, 234</p>
                                <p style={{fontFamily: 'Avenir', fontWeight: '500', fontSize: '16px', color: '#212353'}}>Bahagia Ave Street PRBW 29281</p>
                            </div>
                            <div>
                                <p>info@warehouse.project</p>
                                <p>1-232-3434 (Main)</p>
                            </div>
                        </div>
                    </div>
                    <div className="footer__item">
                        <div className="footer__item--first">
                            <p className='footer__title'>About</p>
                            <p className='footer__link'>Profile</p>
                            <p className='footer__link'>Features</p>
                            <p className='footer__link'>Careers</p>
                            <p className='footer__link'>DW News</p>
                        </div>
                    </div>
                    <div className="footer__item">
                        <div className="footer__item--first">
                            <p className='footer__title'>Help</p>
                            <p className='footer__link'>Support</p>
                            <p className='footer__link'>Sign up</p>
                            <p className='footer__link'>Guide</p>
                            <p className='footer__link'>Reports</p>
                            <p className='footer__link'>Q&A</p>
                        </div>
                    </div>
                    <div className="footer__item">
                        <div className="footer__item--first">
                            <p className='footer__title'>Social Media</p>
                            <div className="social__list">
                                <div className="social__item"></div>
                                <div className="social__item"></div>
                                <div className="social__item"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom">
                    <div className="footer__item--second">
                        <p>© Datawarehouse™, 2020. All rights reserved.</p>
                        <p>Company Registration Number: 21479524.</p>
                    </div>
                    <div className="footer__item--second" style={{display: 'flex', justifyContent: 'end'}}>
                        <div className="footer__chat">
                            <i className="fa-solid fa-comment-dots"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;