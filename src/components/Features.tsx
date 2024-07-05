import React from 'react';
import f1 from '@/assets/images/feature1.png'
import f1_bg from '@/assets/images/feature1-bg.png'
import f2 from '@/assets/images/feature2.png'
import f2_bg from '@/assets/images/feature2-bg.png'
import f3 from '@/assets/images/feature3.png'
import f3_bg from '@/assets/images/feature3-bg.png'
import f4 from '@/assets/images/feature4.png'
import f4_bg from '@/assets/images/feature4-bg.png'
import '@/assets/styles/Features.css'

const Features = () => {
    return (
        <div className='features __container'>
            <div className="__content">
                <div className="features__title">
                    <h1>Features</h1>
                    <p>Some of the features and advantages that we provide for those of you who store data in this Data Warehouse.</p>
                </div>
                <div className="features__list">
                    <div className="features__item" >
                        <div className="features__background" style={{backgroundImage: `url("${f1_bg}")`}}></div>
                        <img src={f1} alt="f1"/>
                        <div className="features__item--text">
                            <h3>Search Data</h3>
                            <p>Don’t worry if your data is very large, the Data Warehoue provides a search engine, which is useful for making it easier to find data effectively saving time.</p>
                            <div className="features__link">
                                <p>Learn more</p>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                    <div className="features__item" >
                        <div className="features__background" style={{backgroundImage: `url("${f2_bg}")`}}></div>
                        <img src={f2} alt="f2"/>
                        <div className="features__item--text">
                            <h3>24 Hours Access</h3>
                            <p>Access is given 24 hours a full morning to night and
                                meet again in the morning, giving you comfort when
                                you need data when urgent.</p>
                            <div className="features__link">
                                <p>Learn more</p>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                    <div className="features__item" >
                        <div className="features__background" style={{backgroundImage: `url("${f3_bg}")`}}></div>
                        <img src={f3} alt="f3"/>
                        <div className="features__item--text">
                            <h3>Print Out</h3>
                            <p>Print out service gives you convenience if someday
                                you need print data, just edit it all and just print it.</p>
                            <div className="features__link">
                                <p>Learn more</p>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                    <div className="features__item" >
                        <div className="features__background" style={{backgroundImage: `url("${f4_bg}")`}}></div>
                        <img src={f4} alt="f4"/>
                        <div className="features__item--text">
                            <h3>Security Code</h3>
                            <p>Data Security is one of our best facilities. Allows for your files
                                to be safer. The file can be secured with a code or password that
                                you created, so only you can open the file.</p>
                            <div className="features__link">
                                <p>Learn more</p>
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;