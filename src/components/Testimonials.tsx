import React, {useState} from 'react';
import '@/assets/styles/Testimonials.css'
import avatar1 from '@/assets/images/avatar1.jpeg'

const arr = [{
    avatar: avatar1,
    name: 'John Fang',
    url: 'wordfaang.com',
    text: 'Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.'
},
    {
        avatar: 'https://ntvb.tmsimg.com/assets/assets/487578_v9_bb.jpg?w=360&h=480',
        name: 'John Cena',
        url: 'cena12391381.com',
        text: 'Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.'
    },
    {
        avatar: 'https://images2.thanhnien.vn/528068263637045248/2024/1/31/jw1-17066873444681386177978.jpg',
        name: 'John Wick',
        url: 'dogXwickXgod.com',
        text: 'Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.'
    },
    {
        avatar: 'https://lh4.googleusercontent.com/proxy/jATAfDkBtuag3Oq-6OGaopKuJJKV_HjC_cHerX4prCEUNzQ_YG676Ftp3iatOrcdoPtE3mV5Af9_nDX6bQtQFFK1GUQ',
        name: 'John Terry',
        url: 'chelsea.com',
        text: 'Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.'
    }]

const Testimonials = () => {

    const [index, setIndex] = useState(0);

    const handleDec = () => {
        if(index===0){
            setIndex(arr.length-1);
            return;
        }
        setIndex(prev=>prev-1)
    }

    const handleInc = () => {
        if(index===arr.length-1){
            setIndex(0);
            return;
        }
        setIndex(prev=>prev+1)
    }

    return (
        <div className='tms __container'>
            <div className="__content">
                <div className="__box">
                    <h1>Testimonials</h1>
                    <div className="tms__slider">
                        <div className="tms__slider--left" onClick={handleDec}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </div>
                        <div className="tms__slider--right" onClick={handleInc}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                        <div className="tms__slider--item">
                            <div className="tms__slider--first">
                                <div className="tms__avatar">
                                    <img src={arr[index].avatar} alt="avatar"/>
                                </div>
                                <div className="tms__info">
                                    <p className='tms__name'>{arr[index].name}</p>
                                    <p className='tms__url'>{arr[index].url}</p>
                                </div>
                            </div>
                            <div className="tms__slider--second">
                                <p className='tms__text'>
                                    {arr[index].text}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="tms__circle-list">
                        <div className="tms__circle" id={index===0?'tms__circle--selected':undefined} onClick={()=>setIndex(0)}></div>
                        <div className="tms__circle" id={index===1?'tms__circle--selected':undefined} onClick={()=>setIndex(1)}></div>
                        <div className="tms__circle" id={index===2?'tms__circle--selected':undefined} onClick={()=>setIndex(2)}></div>
                        <div className="tms__circle" id={index===3?'tms__circle--selected':undefined} onClick={()=>setIndex(3)}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;